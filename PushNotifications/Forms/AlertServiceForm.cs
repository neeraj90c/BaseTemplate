using MiNET.Blocks;
using PushNotification.Model;
using PushNotification.Service;
using PushNotifications.Interface;
using PushNotifications.Model;
using PushNotifications.Service;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace PushNotifications.Forms
{
    public partial class AlertServiceForm : Form
    {
        EmailConfigService _emailConfigService = new EmailConfigService();
        AlertMasterService _alertMasterService = new AlertMasterService();
        ConnectionConfigService _connectionConfig = new ConnectionConfigService();
        SchedularService _schedularService = new SchedularService();
        AlertService alertService = new AlertService();


        SchedularList schedularListAll = new SchedularList();
        private List<AlertVariableMapping> _alertVariablesList = new List<AlertVariableMapping>();
        AlertServiceMasterDTO alertServiceMaster = new AlertServiceMasterDTO();




        public AlertServiceForm()
        {
            InitializeComponent();
            LoadAllConfig();
            VariablesDataGRID.CellContentClick += VariablesDataGRID_CellContentClick;
        }

        private void LoadAllConfig()
        {
            EmailConfigurationList emailConfigListContainer = _emailConfigService.GetEmailConfigDetails();
            ConnectionList connectionConfig = _connectionConfig.GetConnectionList();

            schedularListAll = _schedularService.AlertsSchedularGetALL();



            ASMAlertConfigType.DataSource = emailConfigListContainer.emailConfigList;
            ASMAlertConfigType.DisplayMember = "IName";
            ASMAlertConfigType.ValueMember = "EmailConfigId";

            ASMConnection.DataSource = connectionConfig.connectionList;
            ASMConnection.DisplayMember = "ConnName";
            ASMConnection.ValueMember = "DBConnId";

            ASMSchedular.DataSource = schedularListAll.schedularList;
            ASMSchedular.ValueMember = "SchedularId";
            ASMSchedular.DisplayMember = "IName";
        }

        private void SaveEmailConfigAll_Click(object sender, EventArgs e)
        {
            alertServiceMaster.EmailTo = ASMEmailTo.Text;
            alertServiceMaster.CCTo = ASMCc.Text;
            alertServiceMaster.BccTo = ASMBcc.Text;
            alertServiceMaster.ASubject = ASMEmailSubject.Text;
            alertServiceMaster.ABody = ASMEmailBody.Text;
            alertServiceMaster.HasAttachment = ASMAttachment.Checked ? 1 : 0;
            alertServiceMaster.AttachmentType = ASMAttachType.Text;
            alertServiceMaster.AttachmentPath = ASMAttachPath.Text;
            alertServiceMaster.AttachmentFileType = ASMAttachFileType.Text;
            alertServiceMaster.OutputFileName = ASMFileOutput.Text;
            alertServiceMaster.Title = ASMTitle.Text;
            alertServiceMaster.SDesc = ASMDesc.Text;
            alertServiceMaster.AlertType = ASMAlertType.Text;
            alertServiceMaster.AlertConfigId = Convert.ToInt32(ASMAlertConfigType.SelectedValue);
            alertServiceMaster.DBConnid = Convert.ToInt32(ASMConnection.SelectedValue);
            alertServiceMaster.DataSourceType = ASMDataSourceType.Text;
            alertServiceMaster.DataSourceDef = ASMDataSourceDef.Text;
            alertServiceMaster.PostSendDataSourceType = ASMPostSendDataSourceType.Text;
            alertServiceMaster.PostSendDataSourceDef = ASMPostSendDataSourceDef.Text;
            alertServiceMaster.StartDate = ASStartDate.Value;
            alertServiceMaster.EndDate = ASEndDate.Value;
            alertServiceMaster.DailyStart = ASDailyStartDate.Value;
            alertServiceMaster.DailyEnd = ASDailyEndDate.Value;
            alertServiceMaster.SchedularId = Convert.ToInt32(ASMSchedular.SelectedValue);


            try
            {
                AlertServiceMasterDTO response = new AlertServiceMasterDTO();
                response = _alertMasterService.AlertMasterServiceInsert(alertServiceMaster);

                AlertServiceVariablesForm alertServiceVariablesForm = new AlertServiceVariablesForm(this);

                if (response.ServiceId != 0)
                {

                    foreach (var item in _alertVariablesList)
                    {
                        item.VariableId = 0;
                        item.ServiceId = response.ServiceId;
                        item.SchedularId = response.SchedularId;

                        try
                        {
                            _alertMasterService.AlertVariableCRUD(item);
                        }
                        catch (Exception ex)
                        {
                            
                            MessageBox.Show("There was some error with" + " " + item.VarInstance + ", error: " + ex.Message);
                        }
                    }
                }
                alertService.LoadServiceListDetails();
                MessageBox.Show("Alert added successfully");
            }
            catch (Exception ex)
            {
                MessageBox.Show("There was some error with" + ex.Message);
            }
        }

        private void AddVariablesButton_Click(object sender, EventArgs e)
        {
            AlertServiceVariablesForm alertServiceVariablesForm = new AlertServiceVariablesForm(this);
            alertServiceVariablesForm.ShowDialog();
        }


        public void UpdateAlertDataGridView(List<AlertVariableMapping> alertVariablesList)
        {
            VariablesDataGRID.AutoGenerateColumns = false;
            _alertVariablesList = alertVariablesList;

            VariablesDataGRID.Rows.Clear();
            VariablesDataGRID.Columns.Clear();

            VariablesDataGRID.Columns.Add("VarValue", "Variable Value");
            VariablesDataGRID.Columns.Add("VarInstance", "Variable Instance");
            VariablesDataGRID.Columns.Add("VarType", "Variable Type");

            DataGridViewButtonColumn deleteButtonColumn = new DataGridViewButtonColumn();
            deleteButtonColumn.Name = "Delete";
            deleteButtonColumn.Text = "Delete";
            deleteButtonColumn.UseColumnTextForButtonValue = true;
            VariablesDataGRID.Columns.Add(deleteButtonColumn);

            foreach (var item in _alertVariablesList)
            {
                VariablesDataGRID.Rows.Add(
                    item.VarValue,
                    item.VarInstance,
                    item.VarType,
                    "Delete" 
                );
            }
            MessageBox.Show("Variable Added!");
        }

        private void VariablesDataGRID_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.ColumnIndex == VariablesDataGRID.Columns["Delete"].Index && e.RowIndex >= 0)
            {
                int rowIndex = e.RowIndex;

                if (rowIndex < _alertVariablesList.Count)
                {
                    _alertVariablesList.RemoveAt(rowIndex);
                    UpdateAlertDataGridView(_alertVariablesList);
                }
            }
        }

    }
}