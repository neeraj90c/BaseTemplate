using PushNotifications.Model;
using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace PushNotifications.Forms
{
    public partial class AlertServiceVariablesForm : Form
    {
        // Change from public field to private property
        public List<AlertVariableMapping> AlertVariableList { get; private set; }

        private AlertServiceForm _alertServiceForm; // Reference to the main form

        public AlertServiceVariablesForm(AlertServiceForm alertServiceForm)
        {
            InitializeComponent();
            _alertServiceForm = alertServiceForm; // Set the reference to the main form

            // Initialize the list in the constructor
            AlertVariableList = new List<AlertVariableMapping>();
        }

        private void SaveAllVariablesButton_Click(object sender, EventArgs e)
        {
            AlertVariableMapping alertVariableMapping = new AlertVariableMapping();

            // Populate properties from form controls
            alertVariableMapping.VariableId = 0;
            alertVariableMapping.VarInstance = ASVariableInstance.Text;
            alertVariableMapping.VarValue = ASVariableValue.Text;
            alertVariableMapping.VarType = ASVariableType.Text;
            alertVariableMapping.ServiceId = 0;
            alertVariableMapping.SchedularId = 0;
            alertVariableMapping.IsActive = 1;
            alertVariableMapping.IsDeleted = 0;
            alertVariableMapping.ActionUser = 0;

            AlertVariableList.Add(alertVariableMapping);

            // Update the data grid view in the main form using the reference
            _alertServiceForm.UpdateAlertDataGridView(AlertVariableList);

            ASVariableInstance.Clear();
            ASVariableValue.Clear();
            ASVariableType.ResetText();
        }
    }
}
