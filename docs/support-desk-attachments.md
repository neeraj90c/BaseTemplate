# Support Desk: attachments not saved when creating a ticket

Status: **investigated 2026-10-29, root cause not yet confirmed, no code changed.**

## Report
Client attaches a file in Create Ticket (technoerp.vnccy.com/CSD/active-tickets), the ticket is created, but the ticket shows no attachment. No error shown.

## Flow
1. `attachment-picker` only stages files in the browser.
2. `CreateTicketComponent.TicketUpdate` calls `Ticket/ManageTicket`, reads `res.tickets[0].ticketId`, then `uploadStagedAttachments` posts each file to `attachment/Upload` (`MasterType=SupportTickets`).
3. `view-ticket` reads `attachment/GetByMaster/SupportTickets/{ticketId}`.

## Verified on PROD (database TTE_SupportDesk on AdvinProd01, read-only)
- `spd.ManageTicket_CRUD` already returns the created ticket (final `SELECT ... WHERE A.TicketId = @TicketId`, LEFT JOINs only).
- `ana.AttachmentMaster` and all `ana.AttachmentMaster_*` / `AttachmentAllowedExtension_ReadAll` procs exist; `.txt` (2 MB), `.jpg`, `.pdf` are allowed.
- Test ticket 29315 ("TEST", 2026-10-28 12:22:03) was created and has 0 attachments.
- All 19 attachment rows ever saved were added 90 s to 14 days after ticket creation (view page). **No attachment has ever been saved by the create-ticket flow.**
- Deployed front-end bundle (`747.*.js` chunk) contains the same `uploadStagedAttachments` code as the repo, so it is not an old build.

## Conclusion so far
DB, procs, allowed extensions and the deployed build are fine. The failure is between the browser and `attachment/Upload` in the create flow (no row is ever written). Not yet known whether the upload request is never sent (e.g. `attachmentPicker` ViewChild empty at submit) or is sent and fails.

## To confirm
DevTools > Network (Preserve log) while creating a ticket with a file: is there an `attachment/Upload` request, and its status? Also check the `ManageTicket` response has `tickets[0].ticketId`.

## Fix (applied in code 2026-10-29, NOT yet deployed or verified on PROD)
`create-ticket.component.ts/.html`: staged files are tracked via the picker's `(selectionChange)` (no `@ViewChild` read at submit); uploads run in a `forkJoin` (one failure doesn't cancel the others) and finish before the modal closes and the route reloads; upload errors are persistent toasts; double-submit guarded by `isSubmitting`.
Note: picking a file does not upload anything, so the client does not need to "wait" after choosing; uploads start on Submit.

## Deploy / verify
Rebuild and deploy the Angular client, create a ticket with a file, then check `SELECT * FROM ana.AttachmentMaster WHERE MasterId = <new TicketId>` and the ticket's Attachments section.
