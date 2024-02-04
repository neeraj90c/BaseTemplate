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


                schedularListAll = _schedularService.AlertsSchedularGetALL();
                SchedularListGRIDView.DataSource = schedularListAll.schedularList;



                var result = _alertMasterService.AlertMasterServiceGetAll();
                ServiceListDataGrid.DataSource = result.alertServiceList;
                foreach (DataGridViewRow row in ServiceListDataGrid.Rows)
                {
                    Console.WriteLine(row);

                    // Assuming "IsActive" is the name of the column containing the status
                    var cellValue = row.Cells["IsActive"].Value.ToString();

                    if (cellValue == "1")
                    {
                        row.DefaultCellStyle.BackColor = System.Drawing.Color.Green;
                    }
                    else
                    {
                        // If "IsActive" is not 1, set a default background color (e.g., white)
                        row.DefaultCellStyle.ForeColor = System.Drawing.Color.White;
                    }
                }



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


        private void SaveSchedularButton_Click(object sender, EventArgs e)
        {
            SchedularConfigDTO schedularConfigDTO = new SchedularConfigDTO();

            schedularConfigDTO.IName = SSNameTextBox.Text;
            schedularConfigDTO.ICode = SSCodeTextBox.Text;
            schedularConfigDTO.IDesc = SSCodeTextBox.Text;
            schedularConfigDTO.FrequencyInMinutes = Convert.ToInt32(SSFrequencyTextBox.Text);
            schedularConfigDTO.SchedularType = SSTypeComboBox.Text;
            schedularConfigDTO.IsActive = SSActiveCheckbox.Checked;

            SchedularList result = _schedularService.CreateAlertsSchedular(schedularConfigDTO);
            SchedularListGRIDView.DataSource = result.schedularList;


            MessageBox.Show("Schedular saved successfully");
        }



        private void AddAlertServiceButton_Click(object sender, EventArgs e)
        {
            AlertServiceForm form = new AlertServiceForm();
            form.ShowDialog();
        }

        private void EditAlertServiceButton_Click(object sender, EventArgs e)
        {
            AlertServiceForm form = new AlertServiceForm();
            form.ShowDialog();
        }



        private void ServiceListDataGrid_SelectionChanged(object sender, EventArgs e)
        {
            if (ServiceListDataGrid.SelectedRows.Count > 0)
            {
                // Get the data from the selected row
                DataGridViewRow selectedRow = ServiceListDataGrid.SelectedRows[0];
                int id = Convert.ToInt32(selectedRow.Cells["ServiceId"].Value);
                string name = selectedRow.Cells["Title"].Value.ToString();

                // Display or process the selected data
                MessageBox.Show($"Selected Row: ID = {id}, Name = {name}");
            }
        }
    }
}
