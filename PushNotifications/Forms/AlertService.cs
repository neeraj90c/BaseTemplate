using Common;
using Org.BouncyCastle.Asn1.Cmp;
using PushNotification.Interface;
using PushNotification.Model;
using PushNotification.Service;
using PushNotifications.Interface;
using PushNotifications.Model;
using PushNotifications.Service;
using System;
using System.ComponentModel;
using System.Security.Cryptography.X509Certificates;
using System.Windows.Forms;



namespace PushNotifications.Forms
{
    public partial class AlertService : Form
    {
        private readonly EmailConfigService emailConfigService = new EmailConfigService();
        private readonly EncryptDecryptService _encryptDecryptService = new EncryptDecryptService();
        EmailConfigurationList _emailConfig = new EmailConfigurationList();
        ConnectionConfigService _connectionConfig = new ConnectionConfigService();
        AlertMasterService _alertMasterService = new AlertMasterService();
        SchedularService _schedularService = new SchedularService();
        SchedularList schedularListAll = new SchedularList();
        EmailConfigurationDTO emailConfigurationDTO = new EmailConfigurationDTO();
        ConnectionConfigDTO connectionConfigDTO = new ConnectionConfigDTO();

        public int AlertServiceId;
        public int EmailConfigId;




        public AlertService()
        {
            InitializeComponent();
            LoadAllConfig();

            EditAlertServiceButton.Enabled = false;
            EmailEditButton.Enabled = false;
        }
        private void LoadAllConfig()
        {
            try
            {
                LoadServiceListDetails();
                LoadEmailDetails();
                LoadDBConnectionDetails();
                LoadSchedularDetails();

            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading data: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }


        public void LoadEmailDetails()
        {

            EmailConfigurationList emailConfigListContainer = emailConfigService.GetEmailConfigDetails();
            EmailDataGrid.DataSource = emailConfigListContainer.emailConfigList;
            //EmailDataGrid.CellFormatting += EmailDataGrid_CellFormatting;
        }

        private void EmailDataGrid_CellFormatting(object sender, DataGridViewCellFormattingEventArgs e)
        {

        }

        public void LoadDBConnectionDetails()
        {
            ConnectionList connectionConfig = _connectionConfig.GetConnectionList();
            ConnectionListDataGrid.CellFormatting += ConnectionListDataGrid_CellFormatting;
            ConnectionListDataGrid.DataSource = connectionConfig.connectionList;
        }

        private void ConnectionListDataGrid_CellFormatting(object sender, DataGridViewCellFormattingEventArgs e)
        {
            if (e.RowIndex >= 0 && e.RowIndex < ConnectionListDataGrid.Rows.Count && ConnectionListDataGrid.Columns[e.ColumnIndex].Name == "IsActive")
            {
                int isActiveValue = Convert.ToInt32(ConnectionListDataGrid[e.ColumnIndex, e.RowIndex].Value);

                // Check if the current row is visible on the screen
                if (ConnectionListDataGrid.Rows[e.RowIndex].Displayed)
                {
                    // Check the value of IsActive and set the row color accordingly
                    if (isActiveValue == 0)
                    {
                        ConnectionListDataGrid.Rows[e.RowIndex].DefaultCellStyle.BackColor = Color.Salmon;
                        ConnectionListDataGrid.Rows[e.RowIndex].DefaultCellStyle.ForeColor = Color.Black;
                    }
                    else
                    {
                        // Reset the row color if IsActive is not 0
                        ConnectionListDataGrid.Rows[e.RowIndex].DefaultCellStyle.BackColor = Color.LightGreen;
                        ConnectionListDataGrid.Rows[e.RowIndex].DefaultCellStyle.ForeColor = Color.Black;
                    }
                }
            }
        }

        public void LoadSchedularDetails()
        {
            schedularListAll = _schedularService.AlertsSchedularGetALL();
            SchedularListGRIDView.CellFormatting += SchedularListGRIDView_CellFormatting;
            SchedularListGRIDView.DataSource = schedularListAll.schedularList;
        }

        private void SchedularListGRIDView_CellFormatting(object sender, DataGridViewCellFormattingEventArgs e)
        {

        }



        public void LoadServiceListDetails()
        {
            var result = _alertMasterService.AlertMasterServiceGetAll();
            //ServiceListDataGrid.CellFormatting += ServiceListDataGrid_CellFormatting;
            ServiceListDataGrid.DataSource = result.alertServiceList;
            //ServiceListDataGrid.CellPainting += ServiceListDataGrid_CellPainting;
            //ServiceListDataGrid.RowPrePaint += ServiceListDataGrid_RowPrePaint;
            //ServiceListDataGrid.RowPostPaint += ServiceListDataGrid_RowPostPaint;
        }

        private void ServiceListDataGrid_SelectionChanged(object sender, EventArgs e)
        {
            if (ServiceListDataGrid.SelectedRows.Count > 0)
            {
                DataGridViewRow selectedRow = ServiceListDataGrid.SelectedRows[0];
                int id = Convert.ToInt32(selectedRow.Cells["ServiceId"].Value);
                AlertServiceId = id;
                EditAlertServiceButton.Enabled = AlertServiceId > 0 || AlertServiceId != 0;
            }
        }

        private void AddAlertServiceButton_Click(object sender, EventArgs e)
        {
            AlertServiceForm form = new AlertServiceForm();
            form.ShowDialog();
        }

        private void EditAlertServiceButton_Click(object sender, EventArgs e)
        {
            AlertServiceForm form = new AlertServiceForm(AlertServiceId);
            form.ShowDialog();
        }




        private void EmailDataGrid_SelectionChanged(object sender, EventArgs e)
        {
            if (EmailDataGrid.SelectedRows.Count > 0)
            {
                DataGridViewRow selectedRow = EmailDataGrid.SelectedRows[0];
                emailConfigurationDTO.EmailConfigId = Convert.ToInt32(selectedRow.Cells["EmailConfigId"].Value);
                emailConfigurationDTO.IName = Convert.ToString(selectedRow.Cells["IName"].Value);
                emailConfigurationDTO.IDesc = Convert.ToString(selectedRow.Cells["IDesc"].Value);
                emailConfigurationDTO.IPort = Convert.ToString(selectedRow.Cells["IPort"].Value);
                emailConfigurationDTO.IHost = Convert.ToString(selectedRow.Cells["IHost"].Value);
                emailConfigurationDTO.IFrom = Convert.ToString(selectedRow.Cells["IFrom"].Value);
                emailConfigurationDTO.IPassword = Convert.ToString(selectedRow.Cells["IPassword"].Value);
                emailConfigurationDTO.IEnableSsl = Convert.ToInt32(selectedRow.Cells["IEnableSsl"].Value) == 1 ? true : false;
                emailConfigurationDTO.IsBodyHtml = Convert.ToInt32(selectedRow.Cells["IsBodyHtml"].Value) == 1 ? true : false;
                emailConfigurationDTO.IsActive = Convert.ToInt32(selectedRow.Cells["IsActive"].Value) == 1 ? true : false;

                EmailEditButton.Enabled = emailConfigurationDTO.EmailConfigId > 0 || emailConfigurationDTO.EmailConfigId != 0;
            }
        }
        private void AddEmailButton_Click(object sender, EventArgs e)
        {
            EmailConfigForms form = new EmailConfigForms();
            form.ShowDialog();
        }

        private void EmailEditButton_Click(object sender, EventArgs e)
        {
            EmailConfigForms form = new EmailConfigForms(emailConfigurationDTO);
            form.ShowDialog();
        }



        private void ConnectionListDataGrid_SelectionChanged(object sender, EventArgs e)
        {
            if (ConnectionListDataGrid.SelectedRows.Count > 0)
            {
                DataGridViewRow selectedRow = ConnectionListDataGrid.SelectedRows[0];
                connectionConfigDTO.DBConnId = Convert.ToInt32(selectedRow.Cells["DBConnId"].Value);
                connectionConfigDTO.ConnName = Convert.ToString(selectedRow.Cells["ConnName"].Value);
                connectionConfigDTO.ServerName = Convert.ToString(selectedRow.Cells["ServerName"].Value);
                connectionConfigDTO.UserName = Convert.ToString(selectedRow.Cells["UserName"].Value);
                connectionConfigDTO.Passwrd = Convert.ToString(selectedRow.Cells["Passwrd"].Value);
                connectionConfigDTO.DBName = Convert.ToString(selectedRow.Cells["DBName"].Value);
                connectionConfigDTO.IsActive = Convert.ToInt32(selectedRow.Cells["IsActive"].Value) == 1 ? true : false;
                connectionConfigDTO.ActionUser = Convert.ToInt32(selectedRow.Cells["ActionUser"].Value);
    }
                
        }
        private void DBConnectionAddButton_Click(object sender, EventArgs e)
        {
            DBConnectionForm form = new DBConnectionForm();
            form.ShowDialog();
        }

        private void DBConnectionEditButton_Click(object sender, EventArgs e)
        {
            DBConnectionForm form = new DBConnectionForm(connectionConfigDTO);
            form.ShowDialog();
        }





        private void SchedularEditButton_Click(object sender, EventArgs e)
        {
            SchedularServiceForms form = new SchedularServiceForms();
            form.ShowDialog();
        }

        private void SchedularAddButton_Click(object sender, EventArgs e)
        {
            SchedularServiceForms form = new SchedularServiceForms();
            form.ShowDialog();
        }


    }
}
