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
        AlertService _alertService;
        private SchedularConfigDTO _schedularConfigDTO;

        public SchedularServiceForms(AlertService alertService)
        {
            InitializeComponent();
            _alertService = alertService;
        }

        public SchedularServiceForms(AlertService alertService, SchedularConfigDTO schedularConfigDTO)
        {
            InitializeComponent();
            _alertService = alertService;
            _schedularConfigDTO = schedularConfigDTO;
            BindSchedularForm(schedularConfigDTO);

        }



        private void SaveSchedularButton_Click(object sender, EventArgs e)
        {
            SchedularConfigDTO schedularConfigDTO = new SchedularConfigDTO();

            schedularConfigDTO.SchedularId = _schedularConfigDTO.SchedularId != 0 ? _schedularConfigDTO.SchedularId : 0;
            schedularConfigDTO.IName = SSNameTextBox.Text;
            schedularConfigDTO.ICode = SSCodeTextBox.Text;
            schedularConfigDTO.IDesc = SSDescTextBox.Text;
            schedularConfigDTO.FrequencyInMinutes = Convert.ToInt32(SSFrequencyTextBox.Text);
            schedularConfigDTO.SchedularType = SSTypeComboBox.Text;
            schedularConfigDTO.IsActive = SSActiveCheckbox.Checked;
            schedularConfigDTO.IsDeleted = SSActiveCheckbox.Checked ? 0 : 1;

            SchedularList result = _schedularService.CreateAlertsSchedular(schedularConfigDTO);
            _alertService.LoadSchedularDetails();
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

        private void BindSchedularForm(SchedularConfigDTO schedularConfigDTO)
        {
            SSNameTextBox.Text = schedularConfigDTO.IName;
            SSCodeTextBox.Text = schedularConfigDTO.ICode;
            SSDescTextBox.Text = schedularConfigDTO.IDesc;
            SSFrequencyTextBox.Text = Convert.ToString(schedularConfigDTO.FrequencyInMinutes);
            SSTypeComboBox.Text = schedularConfigDTO.SchedularType;
            SSActiveCheckbox.Checked = schedularConfigDTO.IsActive;
        }
    }
}
