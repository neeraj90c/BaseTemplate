using Common;
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
        AlertServiceMasterDTO alertServiceMaster = new AlertServiceMasterDTO();
        SchedularList schedularListAll = new SchedularList();


        public AlertService()
        {
            InitializeComponent();
            LoadAllConfig();
        }
        private void LoadAllConfig()
        {
            try
            {
                EmailConfigurationList emailConfigListContainer = emailConfigService.GetEmailConfigDetails();
                ConnectionList connectionConfig = _connectionConfig.GetConnectionList();


                EmailDataGrid.DataSource = emailConfigListContainer.emailConfigList;
                ConnectionListDataGrid.DataSource = connectionConfig.connectionList;

                ASMAlertConfigType.DataSource = emailConfigListContainer.emailConfigList;
                ASMAlertConfigType.DisplayMember = "IFrom";
                ASMAlertConfigType.ValueMember = "EmailConfigId";

                ASMConnection.DataSource = connectionConfig.connectionList;
                ASMConnection.DisplayMember = "ConnName";
                ASMConnection.ValueMember = "DBConnId";



                schedularListAll = _schedularService.AlertsSchedularGetALL();
                SchedularListGRIDView.DataSource = schedularListAll.schedularList;

                ASMSchedular.DataSource = schedularListAll.schedularList;
                ASMSchedular.ValueMember = "SchedularId";
                ASMSchedular.DisplayMember = "IName";
                GlobalSchedularComboBox.DataSource = schedularListAll.schedularList;
                GlobalSchedularComboBox.DisplayMember = "IName";
                GlobalSchedularComboBox.ValueMember = "SchedularId";

                var result = _alertMasterService.AlertMasterServiceGetAll();
                ServiceListDataGrid.DataSource = result.alertServiceList;
                GlobalSchedularSName.DataSource = result.alertServiceList;
                GlobalSchedularSName.DisplayMember = "Title";
                GlobalSchedularSName.ValueMember = "ServiceId";


            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading data: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }


        private void saveEmailButton_Click_1(object sender, EventArgs e)
        {
            try
            {
                // Create an instance of EmailConfigDTO and populate its properties from the input fields
                EmailConfigurationDTO emailConfig = new EmailConfigurationDTO
                {
                    IName = IName.Text,
                    IDesc = IDesc.Text,
                    IHost = IHost.Text,
                    IFrom = IEmail.Text,
                    IPassword = _encryptDecryptService.EncryptValue(IPassword.Text),
                    IPort = IPort.Text,
                    IsActive = IsActive.Checked,
                    IEnableSsl = EnableSSL.Checked,
                    IsBodyHtml = HtmlBody.Checked
                };

                // Call the EmailConfigService to insert the email configuration into the database
                _emailConfig = emailConfigService.InsertEmailConfig(emailConfig);
                EmailDataGrid.DataSource = _emailConfig.emailConfigList;



                MessageBox.Show("Email configuration saved successfully");
                ClearEmailConfigInputFields();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
        }


        private void ClearEmailConfigInputFields()
        {
            // Assuming IName, IDesc, IHost, IEmail, IPassword, IPort are TextBox controls
            IName.Text = "";
            IDesc.Text = "";
            IHost.Text = "";
            IEmail.Text = "";
            IPassword.Text = "";
            IPort.Text = "";

            // Assuming IsActive, EnableSSL, HtmlBody are CheckBox controls
            IsActive.Checked = false;
            EnableSSL.Checked = false;
            HtmlBody.Checked = false;
        }

        private void SaveConnectionButton_Click(object sender, EventArgs e)
        {
            ConnectionList result = new ConnectionList();
            try
            {
                ConnectionConfigDTO connectionConfigDTO = new ConnectionConfigDTO
                {
                    ConnName = CNameTextBox.Text,
                    DBName = CDBNameTextBox.Text,
                    ServerName = SNameTextBox.Text,
                    UserName = CUNameTextBox.Text,
                    Passwrd = _encryptDecryptService.EncryptValue(DBPassTextBox.Text),
                    IsActive = CIsActiveCheckbox.Checked,
                    ActionUser = 0,
                    DBConnId = 0

                };

                result = _connectionConfig.ConnectionConfigInsert(connectionConfigDTO);

                ConnectionListDataGrid.DataSource = result.connectionList;
                MessageBox.Show("Connection configuration saved successfully");
                ClearConnectionConfigInputFields();



            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
        }
        private void ClearConnectionConfigInputFields()
        {
            CNameTextBox.Text = "";
            CDBNameTextBox.Text = "";
            SNameTextBox.Text = "";
            CUNameTextBox.Text = "";
            DBPassTextBox.Text = "";
            CIsActiveCheckbox.Checked = false;
        }

        private void SaveASMEmailDetails_Click(object sender, EventArgs e)
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
            AlertServiceTabs.SelectedTab = tabPage5;
        }
        private void SaveASMEmailConfiguration_Click(object sender, EventArgs e)
        {

            alertServiceMaster.Title = ASMTitle.Text;
            alertServiceMaster.SDesc = ASMDesc.Text;
            alertServiceMaster.AlertType = ASMAlertType.Text;
            alertServiceMaster.AlertConfigId = Convert.ToInt32(ASMAlertConfigType.SelectedValue);
            alertServiceMaster.DBConnid = Convert.ToInt32(ASMConnection.SelectedValue);
            alertServiceMaster.DataSourceType = ASMDataSourceType.Text;
            alertServiceMaster.DataSourceDef = ASMDataSourceDef.Text;
            alertServiceMaster.PostSendDataSourceType = ASMPostSendDataSourceType.Text;
            alertServiceMaster.PostSendDataSourceDef = ASMPostSendDataSourceDef.Text;
            ASAlertServiceName.Text = ASMTitle.Text;
            AlertServiceTabs.SelectedTab = tabPage8;
        }
        private void SaveAlertServiceButton_Click(object sender, EventArgs e)
        {
            AlertServiceMapping alertServiceMapping = new AlertServiceMapping();
            alertServiceMapping.varInstance = ASVariableInstance.Text;
            alertServiceMapping.varValue = ASVariableValue.Text;
            alertServiceMapping.varType = ASVariableType.Text;
            alertServiceMapping.StartDate = ASStartDate.Value;
            alertServiceMapping.EndDate = ASEndDate.Value;
            alertServiceMapping.DailyStart = ASDailyStartDate.Value;
            alertServiceMapping.DailyEnd = ASDailyEndDate.Value;
            alertServiceMaster.SchedularId = Convert.ToInt32(ASMSchedular.SelectedValue);
            try
            {
                _alertMasterService.AlertMasterServiceInsert(alertServiceMaster, alertServiceMapping);
                MessageBox.Show("Email Service Added Successfully!");
            }
            catch (Exception ex)
            {
                MessageBox.Show("There was an error!," + ex.Message);
            }
        }

        private void SaveSchedularButton_Click(object sender, EventArgs e)
        {
            SchedularConfigDTO schedularConfigDTO = new SchedularConfigDTO();

            schedularConfigDTO.IName = SSNameTextBox.Text;
            schedularConfigDTO.ICode = SSCodeTextBox.Text;
            schedularConfigDTO.IDesc = SSCodeTextBox.Text;
            schedularConfigDTO.FrequencyInMinutes = Convert.ToInt32(SSFrequencyTextBox.Text);
            schedularConfigDTO.SchedularType = SSTypeComboBox.Text;
            schedularConfigDTO.IsActive = SSActiveCheckbox.Checked ? 1 : 0;
            SchedularList result = _schedularService.CreateAlertsSchedular(schedularConfigDTO);
            SchedularListGRIDView.DataSource = result.schedularList;
            MessageBox.Show("Schedular saved successfully");
        }

        private void SaveGlobalSchedular_Click(object sender, EventArgs e)
        {
            AlertServiceMapping alertServiceMapping = new AlertServiceMapping();

            alertServiceMapping.ServiceId = Convert.ToInt32(GlobalSchedularSName.SelectedValue);
            alertServiceMapping.SchedularId = Convert.ToInt32(GlobalSchedularComboBox.SelectedValue);
            alertServiceMapping.StartDate = GlobalStartOn.Value;
            alertServiceMapping.EndDate = GlobalEndOn.Value;
            alertServiceMapping.DailyStart = GlobalDailyStartOn.Value;
            alertServiceMapping.DailyEnd = GlobalDailyEndOn.Value;
            alertServiceMapping.varInstance = GlobalVarInstance.Text;
            alertServiceMapping.varValue = GlobalVarValue.Text;
            alertServiceMapping.varType = GlobalVarType.Text;

            try
            {
                _alertMasterService.AlertSchedularMapInsert(alertServiceMapping);
                MessageBox.Show("Schedular saved successfully");
            }
            catch (Exception ex)
            {
                MessageBox.Show("There was an error!," + ex.Message);
            }
        }
    }
}
