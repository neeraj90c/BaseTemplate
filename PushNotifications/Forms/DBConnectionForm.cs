using Common;
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

    public partial class DBConnectionForm : Form
    {
        private readonly EncryptDecryptService _encryptDecryptService = new EncryptDecryptService();
        ConnectionConfigService _connectionConfig = new ConnectionConfigService();
        AlertService alertService = new AlertService();


        public DBConnectionForm()
        {
            InitializeComponent();
        }

        public DBConnectionForm(ConnectionConfigDTO connectionConfigDTO)
        {
            InitializeComponent();
            LoadDetailsById(connectionConfigDTO);
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


                alertService.LoadDBConnectionDetails();
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
        
        private void LoadDetailsById(ConnectionConfigDTO connectionConfigDTO)
        {
            CNameTextBox.Text = connectionConfigDTO.ConnName;
            CDBNameTextBox.Text = connectionConfigDTO.DBName;
            SNameTextBox.Text = connectionConfigDTO.ServerName;
            CUNameTextBox.Text = connectionConfigDTO.UserName;
            DBPassTextBox.Text = connectionConfigDTO.Passwrd;
            CIsActiveCheckbox.Checked = connectionConfigDTO.IsActive;
        }
    }
}
