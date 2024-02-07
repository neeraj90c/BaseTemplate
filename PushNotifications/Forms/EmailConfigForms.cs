using Common;
using PushNotification.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
//using static PushNotifications.Forms.AlertService.Designer;

namespace PushNotifications.Forms
{
    public partial class EmailConfigForms : Form
    {
        private readonly EncryptDecryptService _encryptDecryptService = new EncryptDecryptService();
        private readonly EmailConfigService emailConfigService = new EmailConfigService();
        EmailConfigurationList _emailConfig = new EmailConfigurationList();
        AlertService alertService = new AlertService();
        public int EmailConfigId = 0;



        public EmailConfigForms()
        {
            InitializeComponent();
        }

        public EmailConfigForms(EmailConfigurationDTO emailConfigurationDTO)
        {
            InitializeComponent();
            LoadEmailConfigDetails(emailConfigurationDTO);
        }




        private void saveEmailButton_Click(object sender, EventArgs e)
        {
            try
            {
                // Create an instance of EmailConfigDTO and populate its properties from the input fields
                EmailConfigurationDTO emailConfig = new EmailConfigurationDTO
                {
                    EmailConfigId = EmailConfigId != 0 ? EmailConfigId : 0,
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

                MessageBox.Show("Email configuration saved successfully");
                ClearEmailConfigInputFields();
                alertService.LoadEmailDetails();

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

        private void LoadEmailConfigDetails(EmailConfigurationDTO emailConfigurationDTO)
        {
            EmailConfigId = emailConfigurationDTO.EmailConfigId;
            IName.Text = emailConfigurationDTO.IName;
            IDesc.Text = emailConfigurationDTO.IDesc;
            IHost.Text = emailConfigurationDTO.IHost;
            IEmail.Text = emailConfigurationDTO.IFrom;
            
            IPort.Text = emailConfigurationDTO.IPort;
            IsActive.Checked = emailConfigurationDTO.IsActive;
            EnableSSL.Checked = emailConfigurationDTO.IEnableSsl;
            HtmlBody.Checked = emailConfigurationDTO.IsBodyHtml;
        }
    }

}
