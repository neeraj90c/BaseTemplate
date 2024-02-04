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
            EmailDataGrid = new DataGridView();
            IDesc = new RichTextBox();
            saveEmailButton = new Button();
            IsActive = new CheckBox();
            HtmlBody = new CheckBox();
            EnableSSL = new CheckBox();
            label6 = new Label();
            IPort = new TextBox();
            IPassword = new TextBox();
            IEmail = new TextBox();
            IHost = new TextBox();
            label5 = new Label();
            label4 = new Label();
            label3 = new Label();
            label2 = new Label();
            IName = new TextBox();
            label1 = new Label();
            tabPage3 = new TabPage();
            DBPassTextBox = new TextBox();
            CDBNameTextBox = new TextBox();
            CUNameTextBox = new TextBox();
            SNameTextBox = new TextBox();
            ConnectionListDataGrid = new DataGridView();
            SaveConnectionButton = new Button();
            CIsActiveCheckbox = new CheckBox();
            CNameTextBox = new TextBox();
            DBPassLabel = new Label();
            CDBNameLabel = new Label();
            CUNameLabel = new Label();
            SNameLabel = new Label();
            ConnectionNameLabel = new Label();
            tabPage7 = new TabPage();
            SSActiveCheckbox = new CheckBox();
            SaveSchedularButton = new Button();
            SchedularListGRIDView = new DataGridView();
            SSTypeComboBox = new ComboBox();
            SSDescTextBox = new RichTextBox();
            SSFrequencyTextBox = new TextBox();
            SSCodeTextBox = new TextBox();
            SSNameTextBox = new TextBox();
            label30 = new Label();
            label29 = new Label();
            label28 = new Label();
            label27 = new Label();
            label26 = new Label();
            tabPage4 = new TabPage();
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
            AlertMasterServiceTab.Controls.Add(tabPage4);
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
            AddAlertServiceButton.Location = new Point(781, 6);
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
            ServiceListDataGrid.Location = new Point(5, 35);
            ServiceListDataGrid.Name = "ServiceListDataGrid";
            ServiceListDataGrid.RowTemplate.Height = 25;
            ServiceListDataGrid.Size = new Size(941, 349);
            ServiceListDataGrid.TabIndex = 0;
            ServiceListDataGrid.SelectionChanged += ServiceListDataGrid_SelectionChanged;
            // 
            // tabPage1
            // 
            tabPage1.Controls.Add(EmailDataGrid);
            tabPage1.Controls.Add(IDesc);
            tabPage1.Controls.Add(saveEmailButton);
            tabPage1.Controls.Add(IsActive);
            tabPage1.Controls.Add(HtmlBody);
            tabPage1.Controls.Add(EnableSSL);
            tabPage1.Controls.Add(label6);
            tabPage1.Controls.Add(IPort);
            tabPage1.Controls.Add(IPassword);
            tabPage1.Controls.Add(IEmail);
            tabPage1.Controls.Add(IHost);
            tabPage1.Controls.Add(label5);
            tabPage1.Controls.Add(label4);
            tabPage1.Controls.Add(label3);
            tabPage1.Controls.Add(label2);
            tabPage1.Controls.Add(IName);
            tabPage1.Controls.Add(label1);
            tabPage1.Location = new Point(4, 24);
            tabPage1.Name = "tabPage1";
            tabPage1.Padding = new Padding(3);
            tabPage1.Size = new Size(953, 430);
            tabPage1.TabIndex = 0;
            tabPage1.Text = "EmailConfig";
            tabPage1.UseVisualStyleBackColor = true;
            // 
            // EmailDataGrid
            // 
            EmailDataGrid.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            EmailDataGrid.Location = new Point(6, 176);
            EmailDataGrid.Name = "EmailDataGrid";
            EmailDataGrid.RowTemplate.Height = 25;
            EmailDataGrid.Size = new Size(941, 248);
            EmailDataGrid.TabIndex = 18;
            // 
            // IDesc
            // 
            IDesc.Location = new Point(52, 47);
            IDesc.Name = "IDesc";
            IDesc.Size = new Size(395, 96);
            IDesc.TabIndex = 17;
            IDesc.Text = "";
            // 
            // saveEmailButton
            // 
            saveEmailButton.Location = new Point(806, 147);
            saveEmailButton.Name = "saveEmailButton";
            saveEmailButton.Size = new Size(100, 23);
            saveEmailButton.TabIndex = 16;
            saveEmailButton.Text = "Save Email";
            saveEmailButton.UseVisualStyleBackColor = true;
            saveEmailButton.Click += saveEmailButton_Click_1;
            // 
            // IsActive
            // 
            IsActive.AutoSize = true;
            IsActive.Location = new Point(760, 105);
            IsActive.Name = "IsActive";
            IsActive.Size = new Size(67, 19);
            IsActive.TabIndex = 14;
            IsActive.Text = "IsActive";
            IsActive.UseVisualStyleBackColor = true;
            // 
            // HtmlBody
            // 
            HtmlBody.AutoSize = true;
            HtmlBody.Location = new Point(666, 105);
            HtmlBody.Name = "HtmlBody";
            HtmlBody.Size = new Size(88, 19);
            HtmlBody.TabIndex = 13;
            HtmlBody.Text = "HTML Body";
            HtmlBody.UseVisualStyleBackColor = true;
            // 
            // EnableSSL
            // 
            EnableSSL.AutoSize = true;
            EnableSSL.Location = new Point(572, 105);
            EnableSSL.Name = "EnableSSL";
            EnableSSL.Size = new Size(82, 19);
            EnableSSL.TabIndex = 12;
            EnableSSL.Text = "Enable SSL";
            EnableSSL.UseVisualStyleBackColor = true;
            // 
            // label6
            // 
            label6.AutoSize = true;
            label6.Location = new Point(485, 79);
            label6.Name = "label6";
            label6.Size = new Size(63, 15);
            label6.TabIndex = 11;
            label6.Text = "Password :";
            // 
            // IPort
            // 
            IPort.Location = new Point(779, 16);
            IPort.Name = "IPort";
            IPort.Size = new Size(127, 23);
            IPort.TabIndex = 10;
            // 
            // IPassword
            // 
            IPassword.Location = new Point(572, 76);
            IPassword.Name = "IPassword";
            IPassword.Size = new Size(334, 23);
            IPassword.TabIndex = 9;
            IPassword.UseSystemPasswordChar = true;
            // 
            // IEmail
            // 
            IEmail.Location = new Point(572, 47);
            IEmail.Name = "IEmail";
            IEmail.Size = new Size(334, 23);
            IEmail.TabIndex = 8;
            // 
            // IHost
            // 
            IHost.Location = new Point(572, 18);
            IHost.Name = "IHost";
            IHost.Size = new Size(160, 23);
            IHost.TabIndex = 7;
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Location = new Point(485, 50);
            label5.Name = "label5";
            label5.Size = new Size(81, 15);
            label5.TabIndex = 5;
            label5.Text = "Sender Email :";
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(738, 19);
            label4.Name = "label4";
            label4.Size = new Size(35, 15);
            label4.TabIndex = 4;
            label4.Text = "Port :";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(485, 19);
            label3.Name = "label3";
            label3.Size = new Size(38, 15);
            label3.TabIndex = 3;
            label3.Text = "Host :";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(8, 47);
            label2.Name = "label2";
            label2.Size = new Size(38, 15);
            label2.TabIndex = 2;
            label2.Text = "Desc :";
            // 
            // IName
            // 
            IName.Location = new Point(52, 18);
            IName.Name = "IName";
            IName.Size = new Size(395, 23);
            IName.TabIndex = 1;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(8, 21);
            label1.Name = "label1";
            label1.Size = new Size(45, 15);
            label1.TabIndex = 0;
            label1.Text = "Name :";
            // 
            // tabPage3
            // 
            tabPage3.Controls.Add(DBPassTextBox);
            tabPage3.Controls.Add(CDBNameTextBox);
            tabPage3.Controls.Add(CUNameTextBox);
            tabPage3.Controls.Add(SNameTextBox);
            tabPage3.Controls.Add(ConnectionListDataGrid);
            tabPage3.Controls.Add(SaveConnectionButton);
            tabPage3.Controls.Add(CIsActiveCheckbox);
            tabPage3.Controls.Add(CNameTextBox);
            tabPage3.Controls.Add(DBPassLabel);
            tabPage3.Controls.Add(CDBNameLabel);
            tabPage3.Controls.Add(CUNameLabel);
            tabPage3.Controls.Add(SNameLabel);
            tabPage3.Controls.Add(ConnectionNameLabel);
            tabPage3.Location = new Point(4, 24);
            tabPage3.Name = "tabPage3";
            tabPage3.Padding = new Padding(3);
            tabPage3.Size = new Size(953, 430);
            tabPage3.TabIndex = 2;
            tabPage3.Text = "DBConnection";
            tabPage3.UseVisualStyleBackColor = true;
            // 
            // DBPassTextBox
            // 
            DBPassTextBox.Location = new Point(586, 47);
            DBPassTextBox.Name = "DBPassTextBox";
            DBPassTextBox.Size = new Size(321, 23);
            DBPassTextBox.TabIndex = 16;
            DBPassTextBox.UseSystemPasswordChar = true;
            // 
            // CDBNameTextBox
            // 
            CDBNameTextBox.Location = new Point(119, 79);
            CDBNameTextBox.Name = "CDBNameTextBox";
            CDBNameTextBox.Size = new Size(281, 23);
            CDBNameTextBox.TabIndex = 15;
            // 
            // CUNameTextBox
            // 
            CUNameTextBox.Location = new Point(586, 18);
            CUNameTextBox.Name = "CUNameTextBox";
            CUNameTextBox.Size = new Size(321, 23);
            CUNameTextBox.TabIndex = 14;
            // 
            // SNameTextBox
            // 
            SNameTextBox.Location = new Point(119, 47);
            SNameTextBox.Name = "SNameTextBox";
            SNameTextBox.Size = new Size(281, 23);
            SNameTextBox.TabIndex = 13;
            // 
            // ConnectionListDataGrid
            // 
            ConnectionListDataGrid.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            ConnectionListDataGrid.Location = new Point(6, 157);
            ConnectionListDataGrid.Name = "ConnectionListDataGrid";
            ConnectionListDataGrid.RowTemplate.Height = 25;
            ConnectionListDataGrid.Size = new Size(941, 267);
            ConnectionListDataGrid.TabIndex = 12;
            // 
            // SaveConnectionButton
            // 
            SaveConnectionButton.Location = new Point(777, 106);
            SaveConnectionButton.Name = "SaveConnectionButton";
            SaveConnectionButton.Size = new Size(130, 23);
            SaveConnectionButton.TabIndex = 11;
            SaveConnectionButton.Text = "Save Connection";
            SaveConnectionButton.UseVisualStyleBackColor = true;
            SaveConnectionButton.Click += SaveConnectionButton_Click;
            // 
            // CIsActiveCheckbox
            // 
            CIsActiveCheckbox.AutoSize = true;
            CIsActiveCheckbox.Location = new Point(586, 88);
            CIsActiveCheckbox.Name = "CIsActiveCheckbox";
            CIsActiveCheckbox.Size = new Size(67, 19);
            CIsActiveCheckbox.TabIndex = 10;
            CIsActiveCheckbox.Text = "IsActive";
            CIsActiveCheckbox.UseVisualStyleBackColor = true;
            // 
            // CNameTextBox
            // 
            CNameTextBox.Location = new Point(119, 16);
            CNameTextBox.Name = "CNameTextBox";
            CNameTextBox.Size = new Size(281, 23);
            CNameTextBox.TabIndex = 6;
            // 
            // DBPassLabel
            // 
            DBPassLabel.AutoSize = true;
            DBPassLabel.Location = new Point(473, 50);
            DBPassLabel.Name = "DBPassLabel";
            DBPassLabel.Size = new Size(63, 15);
            DBPassLabel.TabIndex = 4;
            DBPassLabel.Text = "Password :";
            // 
            // CDBNameLabel
            // 
            CDBNameLabel.AutoSize = true;
            CDBNameLabel.Location = new Point(6, 82);
            CDBNameLabel.Name = "CDBNameLabel";
            CDBNameLabel.Size = new Size(63, 15);
            CDBNameLabel.TabIndex = 3;
            CDBNameLabel.Text = "DB Name :";
            // 
            // CUNameLabel
            // 
            CUNameLabel.AutoSize = true;
            CUNameLabel.Location = new Point(473, 21);
            CUNameLabel.Name = "CUNameLabel";
            CUNameLabel.Size = new Size(68, 15);
            CUNameLabel.TabIndex = 2;
            CUNameLabel.Text = "UserName :";
            // 
            // SNameLabel
            // 
            SNameLabel.AutoSize = true;
            SNameLabel.Location = new Point(6, 50);
            SNameLabel.Name = "SNameLabel";
            SNameLabel.Size = new Size(77, 15);
            SNameLabel.TabIndex = 1;
            SNameLabel.Text = "ServerName :";
            // 
            // ConnectionNameLabel
            // 
            ConnectionNameLabel.AutoSize = true;
            ConnectionNameLabel.Location = new Point(6, 16);
            ConnectionNameLabel.Name = "ConnectionNameLabel";
            ConnectionNameLabel.Size = new Size(107, 15);
            ConnectionNameLabel.TabIndex = 0;
            ConnectionNameLabel.Text = "ConnectionName :";
            // 
            // tabPage7
            // 
            tabPage7.Controls.Add(SSActiveCheckbox);
            tabPage7.Controls.Add(SaveSchedularButton);
            tabPage7.Controls.Add(SchedularListGRIDView);
            tabPage7.Controls.Add(SSTypeComboBox);
            tabPage7.Controls.Add(SSDescTextBox);
            tabPage7.Controls.Add(SSFrequencyTextBox);
            tabPage7.Controls.Add(SSCodeTextBox);
            tabPage7.Controls.Add(SSNameTextBox);
            tabPage7.Controls.Add(label30);
            tabPage7.Controls.Add(label29);
            tabPage7.Controls.Add(label28);
            tabPage7.Controls.Add(label27);
            tabPage7.Controls.Add(label26);
            tabPage7.Location = new Point(4, 24);
            tabPage7.Name = "tabPage7";
            tabPage7.Padding = new Padding(3);
            tabPage7.Size = new Size(953, 430);
            tabPage7.TabIndex = 4;
            tabPage7.Text = "SchedularService";
            tabPage7.UseVisualStyleBackColor = true;
            // 
            // SSActiveCheckbox
            // 
            SSActiveCheckbox.AutoSize = true;
            SSActiveCheckbox.Location = new Point(655, 91);
            SSActiveCheckbox.Name = "SSActiveCheckbox";
            SSActiveCheckbox.Size = new Size(67, 19);
            SSActiveCheckbox.TabIndex = 7;
            SSActiveCheckbox.Text = "IsActive";
            SSActiveCheckbox.UseVisualStyleBackColor = true;
            // 
            // SaveSchedularButton
            // 
            SaveSchedularButton.Location = new Point(749, 148);
            SaveSchedularButton.Name = "SaveSchedularButton";
            SaveSchedularButton.Size = new Size(166, 23);
            SaveSchedularButton.TabIndex = 6;
            SaveSchedularButton.Text = "Save Schedular";
            SaveSchedularButton.UseVisualStyleBackColor = true;
            SaveSchedularButton.Click += SaveSchedularButton_Click;
            // 
            // SchedularListGRIDView
            // 
            SchedularListGRIDView.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            SchedularListGRIDView.Location = new Point(6, 205);
            SchedularListGRIDView.Name = "SchedularListGRIDView";
            SchedularListGRIDView.RowTemplate.Height = 25;
            SchedularListGRIDView.Size = new Size(941, 219);
            SchedularListGRIDView.TabIndex = 5;
            // 
            // SSTypeComboBox
            // 
            SSTypeComboBox.FormattingEnabled = true;
            SSTypeComboBox.Items.AddRange(new object[] { "Recurring", "Single" });
            SSTypeComboBox.Location = new Point(655, 49);
            SSTypeComboBox.Name = "SSTypeComboBox";
            SSTypeComboBox.Size = new Size(260, 23);
            SSTypeComboBox.TabIndex = 4;
            // 
            // SSDescTextBox
            // 
            SSDescTextBox.Location = new Point(85, 75);
            SSDescTextBox.Name = "SSDescTextBox";
            SSDescTextBox.Size = new Size(397, 112);
            SSDescTextBox.TabIndex = 3;
            SSDescTextBox.Text = "";
            // 
            // SSFrequencyTextBox
            // 
            SSFrequencyTextBox.Location = new Point(655, 20);
            SSFrequencyTextBox.Name = "SSFrequencyTextBox";
            SSFrequencyTextBox.Size = new Size(260, 23);
            SSFrequencyTextBox.TabIndex = 2;
            // 
            // SSCodeTextBox
            // 
            SSCodeTextBox.Location = new Point(59, 46);
            SSCodeTextBox.Name = "SSCodeTextBox";
            SSCodeTextBox.Size = new Size(423, 23);
            SSCodeTextBox.TabIndex = 2;
            // 
            // SSNameTextBox
            // 
            SSNameTextBox.Location = new Point(59, 17);
            SSNameTextBox.Name = "SSNameTextBox";
            SSNameTextBox.Size = new Size(423, 23);
            SSNameTextBox.TabIndex = 2;
            // 
            // label30
            // 
            label30.AutoSize = true;
            label30.Location = new Point(514, 51);
            label30.Name = "label30";
            label30.Size = new Size(92, 15);
            label30.TabIndex = 1;
            label30.Text = "Schedular Type :";
            // 
            // label29
            // 
            label29.AutoSize = true;
            label29.Location = new Point(514, 23);
            label29.Name = "label29";
            label29.Size = new Size(135, 15);
            label29.TabIndex = 0;
            label29.Text = "Frequency (In Minutes) :";
            // 
            // label28
            // 
            label28.AutoSize = true;
            label28.Location = new Point(6, 76);
            label28.Name = "label28";
            label28.Size = new Size(73, 15);
            label28.TabIndex = 0;
            label28.Text = "Description :";
            // 
            // label27
            // 
            label27.AutoSize = true;
            label27.Location = new Point(6, 49);
            label27.Name = "label27";
            label27.Size = new Size(41, 15);
            label27.TabIndex = 0;
            label27.Text = "Code :";
            // 
            // label26
            // 
            label26.AutoSize = true;
            label26.Location = new Point(6, 21);
            label26.Name = "label26";
            label26.Size = new Size(45, 15);
            label26.TabIndex = 0;
            label26.Text = "Name :";
            // 
            // tabPage4
            // 
            tabPage4.Location = new Point(4, 24);
            tabPage4.Name = "tabPage4";
            tabPage4.Padding = new Padding(3);
            tabPage4.Size = new Size(953, 430);
            tabPage4.TabIndex = 3;
            tabPage4.Text = "AlertService";
            tabPage4.UseVisualStyleBackColor = true;
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
            tabPage1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)EmailDataGrid).EndInit();
            tabPage3.ResumeLayout(false);
            tabPage3.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)ConnectionListDataGrid).EndInit();
            tabPage7.ResumeLayout(false);
            tabPage7.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)SchedularListGRIDView).EndInit();
            ((System.ComponentModel.ISupportInitialize)schedularListBindingSource).EndInit();
            ResumeLayout(false);
        }

 

        #endregion

        private TabControl AlertMasterServiceTab;
        private TabPage tabPage1;
        private TabPage tabPage2;
        private Label label1;
        private Label label5;
        private Label label4;
        private Label label3;
        private Label label2;
        private TextBox IName;
        private Label label6;
        private TextBox IPort;
        private TextBox IPassword;
        private TextBox IEmail;
        private TextBox IHost;
        private CheckBox IsActive;
        private CheckBox HtmlBody;
        private CheckBox EnableSSL;
        private Button saveEmailButton;
        private RichTextBox IDesc;
        private Button closeModal;
        private Label lblEmail;
        private DataGridView EmailDataGrid;
        private TabPage tabPage3;
        private Label DBPassLabel;
        private Label CDBNameLabel;
        private Label CUNameLabel;
        private Label SNameLabel;
        public Label ConnectionNameLabel;
        private DataGridView ConnectionListDataGrid;
        private Button SaveConnectionButton;
        private CheckBox CIsActiveCheckbox;
        private TextBox CNameTextBox;
        private TextBox DBPassTextBox;
        private TextBox CDBNameTextBox;
        private TextBox CUNameTextBox;
        private TextBox SNameTextBox;
        private TabPage tabPage4;
        private TabPage tabPage7;
        private Label label29;
        private Label label28;
        private Label label27;
        private Label label26;
        private Label label30;
        private Button SaveSchedularButton;
        private DataGridView SchedularListGRIDView;
        private ComboBox SSTypeComboBox;
        private RichTextBox SSDescTextBox;
        private TextBox SSFrequencyTextBox;
        private TextBox SSCodeTextBox;
        private TextBox SSNameTextBox;
        private CheckBox SSActiveCheckbox;
        private DataGridView ServiceListDataGrid;
        private BindingSource schedularListBindingSource;
        private Button EditAlertServiceButton;
        private Button AddAlertServiceButton;
    }
}