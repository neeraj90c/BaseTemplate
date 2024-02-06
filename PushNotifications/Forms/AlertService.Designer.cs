using System.Windows.Forms;

namespace PushNotifications.Forms
{
    partial class AlertService
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            components = new System.ComponentModel.Container();
            AlertMasterServiceTab = new TabControl();
            tabPage2 = new TabPage();
            EditAlertServiceButton = new Button();
            AddAlertServiceButton = new Button();
            ServiceListDataGrid = new DataGridView();
            tabPage1 = new TabPage();
            AddEmailButton = new Button();
            EmailEditButton = new Button();
            EmailDataGrid = new DataGridView();
            tabPage3 = new TabPage();
            DBConnectionEditButton = new Button();
            DBConnectionAddButton = new Button();
            ConnectionListDataGrid = new DataGridView();
            tabPage7 = new TabPage();
            SchedularEditButton = new Button();
            SchedularAddButton = new Button();
            SchedularListGRIDView = new DataGridView();
            schedularListBindingSource = new BindingSource(components);
            closeModal = new Button();
            lblEmail = new Label();
            AlertMasterServiceTab.SuspendLayout();
            tabPage2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)ServiceListDataGrid).BeginInit();
            tabPage1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)EmailDataGrid).BeginInit();
            tabPage3.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)ConnectionListDataGrid).BeginInit();
            tabPage7.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)SchedularListGRIDView).BeginInit();
            ((System.ComponentModel.ISupportInitialize)schedularListBindingSource).BeginInit();
            SuspendLayout();
            // 
            // AlertMasterServiceTab
            // 
            AlertMasterServiceTab.Controls.Add(tabPage2);
            AlertMasterServiceTab.Controls.Add(tabPage1);
            AlertMasterServiceTab.Controls.Add(tabPage3);
            AlertMasterServiceTab.Controls.Add(tabPage7);
            AlertMasterServiceTab.Location = new Point(12, 12);
            AlertMasterServiceTab.Name = "AlertMasterServiceTab";
            AlertMasterServiceTab.SelectedIndex = 0;
            AlertMasterServiceTab.Size = new Size(961, 458);
            AlertMasterServiceTab.TabIndex = 0;
            // 
            // tabPage2
            // 
            tabPage2.Controls.Add(EditAlertServiceButton);
            tabPage2.Controls.Add(AddAlertServiceButton);
            tabPage2.Controls.Add(ServiceListDataGrid);
            tabPage2.Location = new Point(4, 24);
            tabPage2.Name = "tabPage2";
            tabPage2.Padding = new Padding(3);
            tabPage2.Size = new Size(953, 430);
            tabPage2.TabIndex = 1;
            tabPage2.Text = "Service List";
            tabPage2.UseVisualStyleBackColor = true;
            // 
            // EditAlertServiceButton
            // 
            EditAlertServiceButton.Location = new Point(871, 6);
            EditAlertServiceButton.Name = "EditAlertServiceButton";
            EditAlertServiceButton.Size = new Size(75, 23);
            EditAlertServiceButton.TabIndex = 1;
            EditAlertServiceButton.Text = "Edit";
            EditAlertServiceButton.UseVisualStyleBackColor = true;
            EditAlertServiceButton.Click += EditAlertServiceButton_Click;
            // 
            // AddAlertServiceButton
            // 
            AddAlertServiceButton.Location = new Point(790, 6);
            AddAlertServiceButton.Name = "AddAlertServiceButton";
            AddAlertServiceButton.Size = new Size(75, 23);
            AddAlertServiceButton.TabIndex = 1;
            AddAlertServiceButton.Text = "Add";
            AddAlertServiceButton.UseVisualStyleBackColor = true;
            AddAlertServiceButton.Click += AddAlertServiceButton_Click;
            // 
            // ServiceListDataGrid
            // 
            ServiceListDataGrid.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            ServiceListDataGrid.Location = new Point(6, 35);
            ServiceListDataGrid.Name = "ServiceListDataGrid";
            ServiceListDataGrid.RowTemplate.Height = 25;
            ServiceListDataGrid.Size = new Size(940, 389);
            ServiceListDataGrid.TabIndex = 0;
            ServiceListDataGrid.SelectionChanged += ServiceListDataGrid_SelectionChanged;
            // 
            // tabPage1
            // 
            tabPage1.Controls.Add(AddEmailButton);
            tabPage1.Controls.Add(EmailEditButton);
            tabPage1.Controls.Add(EmailDataGrid);
            tabPage1.Location = new Point(4, 24);
            tabPage1.Name = "tabPage1";
            tabPage1.Padding = new Padding(3);
            tabPage1.Size = new Size(953, 430);
            tabPage1.TabIndex = 0;
            tabPage1.Text = "EmailConfig";
            tabPage1.UseVisualStyleBackColor = true;
            // 
            // AddEmailButton
            // 
            AddEmailButton.Location = new Point(791, 6);
            AddEmailButton.Name = "AddEmailButton";
            AddEmailButton.Size = new Size(75, 23);
            AddEmailButton.TabIndex = 19;
            AddEmailButton.Text = "Add";
            AddEmailButton.UseVisualStyleBackColor = true;
            AddEmailButton.Click += AddEmailButton_Click;
            // 
            // EmailEditButton
            // 
            EmailEditButton.Location = new Point(872, 6);
            EmailEditButton.Name = "EmailEditButton";
            EmailEditButton.Size = new Size(75, 23);
            EmailEditButton.TabIndex = 19;
            EmailEditButton.Text = "Edit";
            EmailEditButton.UseVisualStyleBackColor = true;
            EmailEditButton.Click += EmailEditButton_Click;
            // 
            // EmailDataGrid
            // 
            EmailDataGrid.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            EmailDataGrid.Location = new Point(6, 35);
            EmailDataGrid.Name = "EmailDataGrid";
            EmailDataGrid.RowTemplate.Height = 25;
            EmailDataGrid.Size = new Size(941, 389);
            EmailDataGrid.TabIndex = 18;
            // 
            // tabPage3
            // 
            tabPage3.Controls.Add(DBConnectionEditButton);
            tabPage3.Controls.Add(DBConnectionAddButton);
            tabPage3.Controls.Add(ConnectionListDataGrid);
            tabPage3.Location = new Point(4, 24);
            tabPage3.Name = "tabPage3";
            tabPage3.Padding = new Padding(3);
            tabPage3.Size = new Size(953, 430);
            tabPage3.TabIndex = 2;
            tabPage3.Text = "DBConnection";
            tabPage3.UseVisualStyleBackColor = true;
            // 
            // DBConnectionEditButton
            // 
            DBConnectionEditButton.Location = new Point(872, 6);
            DBConnectionEditButton.Name = "DBConnectionEditButton";
            DBConnectionEditButton.Size = new Size(75, 23);
            DBConnectionEditButton.TabIndex = 13;
            DBConnectionEditButton.Text = "Edit";
            DBConnectionEditButton.UseVisualStyleBackColor = true;
            DBConnectionEditButton.Click += DBConnectionEditButton_Click;
            // 
            // DBConnectionAddButton
            // 
            DBConnectionAddButton.Location = new Point(791, 6);
            DBConnectionAddButton.Name = "DBConnectionAddButton";
            DBConnectionAddButton.Size = new Size(75, 23);
            DBConnectionAddButton.TabIndex = 13;
            DBConnectionAddButton.Text = "Add";
            DBConnectionAddButton.UseVisualStyleBackColor = true;
            DBConnectionAddButton.Click += DBConnectionAddButton_Click;
            // 
            // ConnectionListDataGrid
            // 
            ConnectionListDataGrid.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            ConnectionListDataGrid.Location = new Point(6, 35);
            ConnectionListDataGrid.Name = "ConnectionListDataGrid";
            ConnectionListDataGrid.RowTemplate.Height = 25;
            ConnectionListDataGrid.Size = new Size(941, 389);
            ConnectionListDataGrid.TabIndex = 12;
            // 
            // tabPage7
            // 
            tabPage7.Controls.Add(SchedularEditButton);
            tabPage7.Controls.Add(SchedularAddButton);
            tabPage7.Controls.Add(SchedularListGRIDView);
            tabPage7.Location = new Point(4, 24);
            tabPage7.Name = "tabPage7";
            tabPage7.Padding = new Padding(3);
            tabPage7.Size = new Size(953, 430);
            tabPage7.TabIndex = 4;
            tabPage7.Text = "SchedularService";
            tabPage7.UseVisualStyleBackColor = true;
            // 
            // SchedularEditButton
            // 
            SchedularEditButton.Location = new Point(872, 6);
            SchedularEditButton.Name = "SchedularEditButton";
            SchedularEditButton.Size = new Size(75, 23);
            SchedularEditButton.TabIndex = 6;
            SchedularEditButton.Text = "Edit";
            SchedularEditButton.UseVisualStyleBackColor = true;
            SchedularEditButton.Click += SchedularEditButton_Click;
            // 
            // SchedularAddButton
            // 
            SchedularAddButton.Location = new Point(791, 6);
            SchedularAddButton.Name = "SchedularAddButton";
            SchedularAddButton.Size = new Size(75, 23);
            SchedularAddButton.TabIndex = 6;
            SchedularAddButton.Text = "Add";
            SchedularAddButton.UseVisualStyleBackColor = true;
            SchedularAddButton.Click += SchedularAddButton_Click;
            // 
            // SchedularListGRIDView
            // 
            SchedularListGRIDView.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            SchedularListGRIDView.Location = new Point(6, 35);
            SchedularListGRIDView.Name = "SchedularListGRIDView";
            SchedularListGRIDView.RowTemplate.Height = 25;
            SchedularListGRIDView.Size = new Size(941, 389);
            SchedularListGRIDView.TabIndex = 5;
            // 
            // closeModal
            // 
            closeModal.Location = new Point(898, 491);
            closeModal.Name = "closeModal";
            closeModal.Size = new Size(75, 23);
            closeModal.TabIndex = 1;
            closeModal.Text = "Close";
            closeModal.UseVisualStyleBackColor = true;
            // 
            // lblEmail
            // 
            lblEmail.Location = new Point(0, 0);
            lblEmail.Name = "lblEmail";
            lblEmail.Size = new Size(100, 23);
            lblEmail.TabIndex = 0;
            // 
            // AlertService
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(985, 526);
            Controls.Add(closeModal);
            Controls.Add(AlertMasterServiceTab);
            Name = "AlertService";
            Text = "AlertService";
            AlertMasterServiceTab.ResumeLayout(false);
            tabPage2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)ServiceListDataGrid).EndInit();
            tabPage1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)EmailDataGrid).EndInit();
            tabPage3.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)ConnectionListDataGrid).EndInit();
            tabPage7.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)SchedularListGRIDView).EndInit();
            ((System.ComponentModel.ISupportInitialize)schedularListBindingSource).EndInit();
            ResumeLayout(false);
        }



        #endregion

        private TabControl AlertMasterServiceTab;
        private TabPage tabPage1;
        private TabPage tabPage2;
        private Button closeModal;
        private Label lblEmail;
        private DataGridView EmailDataGrid;
        private TabPage tabPage3;
        private DataGridView ConnectionListDataGrid;
        private TabPage tabPage7;
        private DataGridView SchedularListGRIDView;
        private DataGridView ServiceListDataGrid;
        private BindingSource schedularListBindingSource;
        private Button EditAlertServiceButton;
        private Button AddAlertServiceButton;
        private Button AddEmailButton;
        private Button EmailEditButton;
        private Button DBConnectionEditButton;
        private Button DBConnectionAddButton;
        private Button SchedularEditButton;
        private Button SchedularAddButton;
    }
}