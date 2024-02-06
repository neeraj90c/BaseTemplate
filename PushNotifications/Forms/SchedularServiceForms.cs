using PushNotification.Model;
using PushNotification.Service;
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
    public partial class SchedularServiceForms : Form
    {
        SchedularService _schedularService = new SchedularService();
        AlertService alertService = new AlertService(); 

        public SchedularServiceForms()
        {
            InitializeComponent();
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
            alertService.LoadSchedularDetails();
            ClearSchedularInputFields();
            MessageBox.Show("Schedular saved successfully");
        }


        private void ClearSchedularInputFields()
        {
            SSNameTextBox.Text = "";
            SSCodeTextBox.Text = "";
            SSCodeTextBox.Text = "";
            SSFrequencyTextBox.Text = "";
            SSTypeComboBox.Text = "";
            SSActiveCheckbox.ResetText();
        }
    }
}
