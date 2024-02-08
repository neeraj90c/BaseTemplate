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
        AlertService _alertService;
        private ConnectionConfigDTO _connectionConfigDTO;


        public DBConnectionForm(AlertService alertService)
        {
            InitializeComponent();
            _alertService = alertService;
        }

        public DBConnectionForm(AlertService alertService,ConnectionConfigDTO connectionConfigDTO)
        {
            InitializeComponent();
            _alertService = alertService;
            _connectionConfigDTO = connectionConfigDTO;
            LoadDetailsById(connectionConfigDTO);
        }

        private void SaveConnectionButton_Click(object sender, EventArgs e)
        {
            ConnectionList result = new ConnectionList();
            try
            {
                ConnectionConfigDTO connectionConfigDTO = new ConnectionConfigDTO
                {
                    DBConnId = _connectionConfigDTO.DBConnId != 0 ? _connectionConfigDTO.DBConnId : 0,
                    ConnName = CNameTextBox.Text,
                    DBName = CDBNameTextBox.Text,
                    ServerName = SNameTextBox.Text,
                    UserName = CUNameTextBox.Text,
                    Passwrd = _encryptDecryptService.EncryptValue(DBPassTextBox.Text),
                    IsActive = CIsActiveCheckbox.Checked,
                    ActionUser = 0
                };

                result = _connectionConfig.ConnectionConfigInsert(connectionConfigDTO);


                _alertService.LoadDBConnectionDetails();
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
