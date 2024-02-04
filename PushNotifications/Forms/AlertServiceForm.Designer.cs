namespace PushNotifications.Forms
{
    partial class AlertServiceForm
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
            AlertServiceTabs = new TabControl();
            tabPage5 = new TabPage();
            label22 = new Label();
            ASMAlertConfigType = new ComboBox();
            ASMConnection = new ComboBox();
            label12 = new Label();
            ASMDesc = new RichTextBox();
            label7 = new Label();
            label8 = new Label();
            label9 = new Label();
            ASMDataSourceDef = new RichTextBox();
            label13 = new Label();
            ASMPostSendDataSourceDef = new RichTextBox();
            label25 = new Label();
            label24 = new Label();
            label14 = new Label();
            ASMAlertType = new ComboBox();
            ASMDataSourceType = new ComboBox();
            ASMPostSendDataSourceType = new ComboBox();
            ASMTitle = new TextBox();
            tabPage6 = new TabPage();
            ASMFileOutput = new RichTextBox();
            ASMEmailBody = new RichTextBox();
            ASMAttachPath = new RichTextBox();
            ASMEmailSubject = new TextBox();
            ASMBcc = new TextBox();
            ASMCc = new TextBox();
            ASMEmailTo = new TextBox();
            ASMAttachFileType = new TextBox();
            ASMAttachType = new ComboBox();
            ASMAttachment = new CheckBox();
            label21 = new Label();
            label20 = new Label();
            label19 = new Label();
            label18 = new Label();
            label17 = new Label();
            label16 = new Label();
            label15 = new Label();
            label11 = new Label();
            label10 = new Label();
            tabPage8 = new TabPage();
            label32 = new Label();
            ASDailyEndDate = new DateTimePicker();
            ASDailyStartDate = new DateTimePicker();
            ASEndDate = new DateTimePicker();
            ASStartDate = new DateTimePicker();
            label23 = new Label();
            ASMSchedular = new ComboBox();
            label35 = new Label();
            label34 = new Label();
            label33 = new Label();
            tabPage10 = new TabPage();
            VariablesDataGRID = new DataGridView();
            SaveEmailConfigAll = new Button();
            AddVariablesButton = new Button();
            AlertServiceTabs.SuspendLayout();
            tabPage5.SuspendLayout();
            tabPage6.SuspendLayout();
            tabPage8.SuspendLayout();
            tabPage10.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)VariablesDataGRID).BeginInit();
            SuspendLayout();
            // 
            // AlertServiceTabs
            // 
            AlertServiceTabs.Controls.Add(tabPage5);
            AlertServiceTabs.Controls.Add(tabPage6);
            AlertServiceTabs.Controls.Add(tabPage8);
            AlertServiceTabs.Controls.Add(tabPage10);
            AlertServiceTabs.Location = new Point(12, 16);
            AlertServiceTabs.Name = "AlertServiceTabs";
            AlertServiceTabs.SelectedIndex = 0;
            AlertServiceTabs.Size = new Size(956, 539);
            AlertServiceTabs.TabIndex = 28;
            // 
            // tabPage5
            // 
            tabPage5.AllowDrop = true;
            tabPage5.Controls.Add(label22);
            tabPage5.Controls.Add(ASMAlertConfigType);
            tabPage5.Controls.Add(ASMConnection);
            tabPage5.Controls.Add(label12);
            tabPage5.Controls.Add(ASMDesc);
            tabPage5.Controls.Add(label7);
            tabPage5.Controls.Add(label8);
            tabPage5.Controls.Add(label9);
            tabPage5.Controls.Add(ASMDataSourceDef);
            tabPage5.Controls.Add(label13);
            tabPage5.Controls.Add(ASMPostSendDataSourceDef);
            tabPage5.Controls.Add(label25);
            tabPage5.Controls.Add(label24);
            tabPage5.Controls.Add(label14);
            tabPage5.Controls.Add(ASMAlertType);
            tabPage5.Controls.Add(ASMDataSourceType);
            tabPage5.Controls.Add(ASMPostSendDataSourceType);
            tabPage5.Controls.Add(ASMTitle);
            tabPage5.Location = new Point(4, 24);
            tabPage5.Name = "tabPage5";
            tabPage5.Padding = new Padding(3);
            tabPage5.Size = new Size(948, 511);
            tabPage5.TabIndex = 0;
            tabPage5.Text = "Config";
            tabPage5.UseVisualStyleBackColor = true;
            // 
            // label22
            // 
            label22.AutoSize = true;
            label22.Location = new Point(10, 280);
            label22.Name = "label22";
            label22.Size = new Size(74, 15);
            label22.TabIndex = 46;
            label22.Text = "AlertConfig :";
            // 
            // ASMAlertConfigType
            // 
            ASMAlertConfigType.FormattingEnabled = true;
            ASMAlertConfigType.Location = new Point(106, 274);
            ASMAlertConfigType.Name = "ASMAlertConfigType";
            ASMAlertConfigType.Size = new Size(323, 23);
            ASMAlertConfigType.TabIndex = 44;
            // 
            // ASMConnection
            // 
            ASMConnection.FormattingEnabled = true;
            ASMConnection.Location = new Point(106, 305);
            ASMConnection.Name = "ASMConnection";
            ASMConnection.Size = new Size(323, 23);
            ASMConnection.TabIndex = 42;
            // 
            // label12
            // 
            label12.AutoSize = true;
            label12.Location = new Point(10, 311);
            label12.Name = "label12";
            label12.Size = new Size(90, 15);
            label12.TabIndex = 41;
            label12.Text = "DBConnection :";
            // 
            // ASMDesc
            // 
            ASMDesc.Location = new Point(49, 41);
            ASMDesc.Name = "ASMDesc";
            ASMDesc.Size = new Size(380, 188);
            ASMDesc.TabIndex = 38;
            ASMDesc.Text = "";
            // 
            // label7
            // 
            label7.AutoSize = true;
            label7.Location = new Point(11, 18);
            label7.Name = "label7";
            label7.Size = new Size(35, 15);
            label7.TabIndex = 27;
            label7.Text = "Title :";
            // 
            // label8
            // 
            label8.AutoSize = true;
            label8.Location = new Point(11, 47);
            label8.Name = "label8";
            label8.Size = new Size(38, 15);
            label8.TabIndex = 28;
            label8.Text = "Desc :";
            // 
            // label9
            // 
            label9.AutoSize = true;
            label9.Location = new Point(10, 251);
            label9.Name = "label9";
            label9.Size = new Size(62, 15);
            label9.TabIndex = 29;
            label9.Text = "AlertType :";
            // 
            // ASMDataSourceDef
            // 
            ASMDataSourceDef.Location = new Point(555, 41);
            ASMDataSourceDef.Name = "ASMDataSourceDef";
            ASMDataSourceDef.Size = new Size(313, 93);
            ASMDataSourceDef.TabIndex = 39;
            ASMDataSourceDef.Text = "";
            // 
            // label13
            // 
            label13.AutoSize = true;
            label13.Location = new Point(439, 18);
            label13.Name = "label13";
            label13.Size = new Size(103, 15);
            label13.TabIndex = 30;
            label13.Text = "Data Source Type :";
            // 
            // ASMPostSendDataSourceDef
            // 
            ASMPostSendDataSourceDef.Location = new Point(555, 169);
            ASMPostSendDataSourceDef.Name = "ASMPostSendDataSourceDef";
            ASMPostSendDataSourceDef.Size = new Size(313, 101);
            ASMPostSendDataSourceDef.TabIndex = 40;
            ASMPostSendDataSourceDef.Text = "";
            // 
            // label25
            // 
            label25.AutoSize = true;
            label25.Location = new Point(439, 47);
            label25.Name = "label25";
            label25.Size = new Size(94, 15);
            label25.TabIndex = 31;
            label25.Text = "DataSourceDef  :";
            // 
            // label24
            // 
            label24.AutoSize = true;
            label24.Location = new Point(439, 146);
            label24.Name = "label24";
            label24.Size = new Size(113, 15);
            label24.TabIndex = 32;
            label24.Text = "PostSendDataType  :";
            // 
            // label14
            // 
            label14.AutoSize = true;
            label14.Location = new Point(439, 175);
            label14.Name = "label14";
            label14.Size = new Size(104, 15);
            label14.TabIndex = 33;
            label14.Text = "PostSendDataDef :";
            // 
            // ASMAlertType
            // 
            ASMAlertType.FormattingEnabled = true;
            ASMAlertType.Items.AddRange(new object[] { "Email", "SMS", "WhatsApp" });
            ASMAlertType.Location = new Point(106, 245);
            ASMAlertType.Name = "ASMAlertType";
            ASMAlertType.Size = new Size(323, 23);
            ASMAlertType.TabIndex = 34;
            // 
            // ASMDataSourceType
            // 
            ASMDataSourceType.FormattingEnabled = true;
            ASMDataSourceType.Items.AddRange(new object[] { "Query" });
            ASMDataSourceType.Location = new Point(555, 12);
            ASMDataSourceType.Name = "ASMDataSourceType";
            ASMDataSourceType.Size = new Size(313, 23);
            ASMDataSourceType.TabIndex = 35;
            // 
            // ASMPostSendDataSourceType
            // 
            ASMPostSendDataSourceType.FormattingEnabled = true;
            ASMPostSendDataSourceType.Items.AddRange(new object[] { "Query" });
            ASMPostSendDataSourceType.Location = new Point(555, 140);
            ASMPostSendDataSourceType.Name = "ASMPostSendDataSourceType";
            ASMPostSendDataSourceType.Size = new Size(313, 23);
            ASMPostSendDataSourceType.TabIndex = 36;
            // 
            // ASMTitle
            // 
            ASMTitle.Location = new Point(49, 12);
            ASMTitle.Name = "ASMTitle";
            ASMTitle.Size = new Size(380, 23);
            ASMTitle.TabIndex = 37;
            // 
            // tabPage6
            // 
            tabPage6.Controls.Add(ASMFileOutput);
            tabPage6.Controls.Add(ASMEmailBody);
            tabPage6.Controls.Add(ASMAttachPath);
            tabPage6.Controls.Add(ASMEmailSubject);
            tabPage6.Controls.Add(ASMBcc);
            tabPage6.Controls.Add(ASMCc);
            tabPage6.Controls.Add(ASMEmailTo);
            tabPage6.Controls.Add(ASMAttachFileType);
            tabPage6.Controls.Add(ASMAttachType);
            tabPage6.Controls.Add(ASMAttachment);
            tabPage6.Controls.Add(label21);
            tabPage6.Controls.Add(label20);
            tabPage6.Controls.Add(label19);
            tabPage6.Controls.Add(label18);
            tabPage6.Controls.Add(label17);
            tabPage6.Controls.Add(label16);
            tabPage6.Controls.Add(label15);
            tabPage6.Controls.Add(label11);
            tabPage6.Controls.Add(label10);
            tabPage6.Location = new Point(4, 24);
            tabPage6.Name = "tabPage6";
            tabPage6.Padding = new Padding(3);
            tabPage6.Size = new Size(948, 511);
            tabPage6.TabIndex = 1;
            tabPage6.Text = "Email";
            tabPage6.UseVisualStyleBackColor = true;
            // 
            // ASMFileOutput
            // 
            ASMFileOutput.Location = new Point(596, 204);
            ASMFileOutput.Name = "ASMFileOutput";
            ASMFileOutput.Size = new Size(295, 96);
            ASMFileOutput.TabIndex = 52;
            ASMFileOutput.Text = "";
            // 
            // ASMEmailBody
            // 
            ASMEmailBody.Location = new Point(66, 140);
            ASMEmailBody.Name = "ASMEmailBody";
            ASMEmailBody.Size = new Size(356, 207);
            ASMEmailBody.TabIndex = 52;
            ASMEmailBody.Text = "";
            // 
            // ASMAttachPath
            // 
            ASMAttachPath.Location = new Point(596, 53);
            ASMAttachPath.Name = "ASMAttachPath";
            ASMAttachPath.Size = new Size(295, 116);
            ASMAttachPath.TabIndex = 51;
            ASMAttachPath.Text = "";
            // 
            // ASMEmailSubject
            // 
            ASMEmailSubject.Location = new Point(66, 111);
            ASMEmailSubject.Name = "ASMEmailSubject";
            ASMEmailSubject.Size = new Size(356, 23);
            ASMEmailSubject.TabIndex = 49;
            // 
            // ASMBcc
            // 
            ASMBcc.Location = new Point(66, 82);
            ASMBcc.Name = "ASMBcc";
            ASMBcc.Size = new Size(356, 23);
            ASMBcc.TabIndex = 48;
            // 
            // ASMCc
            // 
            ASMCc.Location = new Point(66, 53);
            ASMCc.Name = "ASMCc";
            ASMCc.Size = new Size(356, 23);
            ASMCc.TabIndex = 47;
            // 
            // ASMEmailTo
            // 
            ASMEmailTo.Location = new Point(66, 24);
            ASMEmailTo.Name = "ASMEmailTo";
            ASMEmailTo.Size = new Size(356, 23);
            ASMEmailTo.TabIndex = 46;
            // 
            // ASMAttachFileType
            // 
            ASMAttachFileType.Location = new Point(596, 175);
            ASMAttachFileType.Name = "ASMAttachFileType";
            ASMAttachFileType.Size = new Size(295, 23);
            ASMAttachFileType.TabIndex = 44;
            // 
            // ASMAttachType
            // 
            ASMAttachType.FormattingEnabled = true;
            ASMAttachType.Location = new Point(596, 24);
            ASMAttachType.Name = "ASMAttachType";
            ASMAttachType.Size = new Size(239, 23);
            ASMAttachType.TabIndex = 38;
            // 
            // ASMAttachment
            // 
            ASMAttachment.AutoSize = true;
            ASMAttachment.Location = new Point(69, 356);
            ASMAttachment.Name = "ASMAttachment";
            ASMAttachment.Size = new Size(109, 19);
            ASMAttachment.TabIndex = 37;
            ASMAttachment.Text = "HasAttachment";
            ASMAttachment.UseVisualStyleBackColor = true;
            // 
            // label21
            // 
            label21.AutoSize = true;
            label21.Location = new Point(6, 146);
            label21.Name = "label21";
            label21.Size = new Size(40, 15);
            label21.TabIndex = 36;
            label21.Text = "Body :";
            // 
            // label20
            // 
            label20.AutoSize = true;
            label20.Location = new Point(6, 117);
            label20.Name = "label20";
            label20.Size = new Size(52, 15);
            label20.TabIndex = 35;
            label20.Text = "Subject :";
            // 
            // label19
            // 
            label19.AutoSize = true;
            label19.Location = new Point(6, 88);
            label19.Name = "label19";
            label19.Size = new Size(32, 15);
            label19.TabIndex = 34;
            label19.Text = "Bcc :";
            // 
            // label18
            // 
            label18.AutoSize = true;
            label18.Location = new Point(6, 58);
            label18.Name = "label18";
            label18.Size = new Size(27, 15);
            label18.TabIndex = 33;
            label18.Text = "Cc :";
            // 
            // label17
            // 
            label17.AutoSize = true;
            label17.Location = new Point(6, 29);
            label17.Name = "label17";
            label17.Size = new Size(57, 15);
            label17.TabIndex = 32;
            label17.Text = "Email To :";
            // 
            // label16
            // 
            label16.AutoSize = true;
            label16.Location = new Point(460, 207);
            label16.Name = "label16";
            label16.Size = new Size(86, 15);
            label16.TabIndex = 31;
            label16.Text = "Output Name :";
            // 
            // label15
            // 
            label15.AutoSize = true;
            label15.Location = new Point(460, 186);
            label15.Name = "label15";
            label15.Size = new Size(124, 15);
            label15.TabIndex = 30;
            label15.Text = "Attachment File Type :";
            // 
            // label11
            // 
            label11.AutoSize = true;
            label11.Location = new Point(460, 30);
            label11.Name = "label11";
            label11.Size = new Size(103, 15);
            label11.TabIndex = 28;
            label11.Text = "Attachment Type :";
            // 
            // label10
            // 
            label10.AutoSize = true;
            label10.Location = new Point(460, 58);
            label10.Name = "label10";
            label10.Size = new Size(100, 15);
            label10.TabIndex = 27;
            label10.Text = "Attachment Path:";
            // 
            // tabPage8
            // 
            tabPage8.Controls.Add(label32);
            tabPage8.Controls.Add(ASDailyEndDate);
            tabPage8.Controls.Add(ASDailyStartDate);
            tabPage8.Controls.Add(ASEndDate);
            tabPage8.Controls.Add(ASStartDate);
            tabPage8.Controls.Add(label23);
            tabPage8.Controls.Add(ASMSchedular);
            tabPage8.Controls.Add(label35);
            tabPage8.Controls.Add(label34);
            tabPage8.Controls.Add(label33);
            tabPage8.Location = new Point(4, 24);
            tabPage8.Name = "tabPage8";
            tabPage8.Padding = new Padding(3);
            tabPage8.Size = new Size(948, 511);
            tabPage8.TabIndex = 2;
            tabPage8.Text = "Schedular";
            tabPage8.UseVisualStyleBackColor = true;
            // 
            // label32
            // 
            label32.AutoSize = true;
            label32.Location = new Point(14, 180);
            label32.Name = "label32";
            label32.Size = new Size(62, 15);
            label32.TabIndex = 52;
            label32.Text = "Daily End :";
            // 
            // ASDailyEndDate
            // 
            ASDailyEndDate.Format = DateTimePickerFormat.Time;
            ASDailyEndDate.Location = new Point(109, 171);
            ASDailyEndDate.Name = "ASDailyEndDate";
            ASDailyEndDate.ShowUpDown = true;
            ASDailyEndDate.Size = new Size(229, 23);
            ASDailyEndDate.TabIndex = 51;
            // 
            // ASDailyStartDate
            // 
            ASDailyStartDate.Format = DateTimePickerFormat.Time;
            ASDailyStartDate.Location = new Point(109, 142);
            ASDailyStartDate.Name = "ASDailyStartDate";
            ASDailyStartDate.ShowUpDown = true;
            ASDailyStartDate.Size = new Size(229, 23);
            ASDailyStartDate.TabIndex = 51;
            // 
            // ASEndDate
            // 
            ASEndDate.Location = new Point(109, 113);
            ASEndDate.Name = "ASEndDate";
            ASEndDate.Size = new Size(229, 23);
            ASEndDate.TabIndex = 51;
            // 
            // ASStartDate
            // 
            ASStartDate.Location = new Point(109, 84);
            ASStartDate.Name = "ASStartDate";
            ASStartDate.Size = new Size(229, 23);
            ASStartDate.TabIndex = 51;
            // 
            // label23
            // 
            label23.AutoSize = true;
            label23.Location = new Point(14, 59);
            label23.Name = "label23";
            label23.Size = new Size(65, 15);
            label23.TabIndex = 49;
            label23.Text = "Schedular :";
            // 
            // ASMSchedular
            // 
            ASMSchedular.DisplayMember = "SchedularId";
            ASMSchedular.FormattingEnabled = true;
            ASMSchedular.Location = new Point(109, 53);
            ASMSchedular.Name = "ASMSchedular";
            ASMSchedular.Size = new Size(229, 23);
            ASMSchedular.TabIndex = 48;
            // 
            // label35
            // 
            label35.AutoSize = true;
            label35.Location = new Point(14, 151);
            label35.Name = "label35";
            label35.Size = new Size(66, 15);
            label35.TabIndex = 0;
            label35.Text = "Daily Start :";
            // 
            // label34
            // 
            label34.AutoSize = true;
            label34.Location = new Point(14, 122);
            label34.Name = "label34";
            label34.Size = new Size(57, 15);
            label34.TabIndex = 0;
            label34.Text = "Ends On :";
            // 
            // label33
            // 
            label33.AutoSize = true;
            label33.Location = new Point(14, 93);
            label33.Name = "label33";
            label33.Size = new Size(73, 15);
            label33.TabIndex = 0;
            label33.Text = "Starts From :";
            // 
            // tabPage10
            // 
            tabPage10.Controls.Add(VariablesDataGRID);
            tabPage10.Controls.Add(SaveEmailConfigAll);
            tabPage10.Controls.Add(AddVariablesButton);
            tabPage10.Location = new Point(4, 24);
            tabPage10.Name = "tabPage10";
            tabPage10.Padding = new Padding(3);
            tabPage10.Size = new Size(948, 511);
            tabPage10.TabIndex = 3;
            tabPage10.Text = "Variables";
            tabPage10.UseVisualStyleBackColor = true;
            // 
            // VariablesDataGRID
            // 
            VariablesDataGRID.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            VariablesDataGRID.Location = new Point(32, 69);
            VariablesDataGRID.Name = "VariablesDataGRID";
            VariablesDataGRID.RowTemplate.Height = 25;
            VariablesDataGRID.Size = new Size(528, 284);
            VariablesDataGRID.TabIndex = 69;
            // 
            // SaveEmailConfigAll
            // 
            SaveEmailConfigAll.Location = new Point(407, 359);
            SaveEmailConfigAll.Name = "SaveEmailConfigAll";
            SaveEmailConfigAll.Size = new Size(118, 23);
            SaveEmailConfigAll.TabIndex = 68;
            SaveEmailConfigAll.Text = "save service";
            SaveEmailConfigAll.UseVisualStyleBackColor = true;
            SaveEmailConfigAll.Click += SaveEmailConfigAll_Click;
            // 
            // AddVariablesButton
            // 
            AddVariablesButton.Location = new Point(363, 40);
            AddVariablesButton.Name = "AddVariablesButton";
            AddVariablesButton.Size = new Size(83, 23);
            AddVariablesButton.TabIndex = 67;
            AddVariablesButton.Text = "Add";
            AddVariablesButton.UseVisualStyleBackColor = true;
            AddVariablesButton.Click += AddVariablesButton_Click;
            // 
            // AlertServiceForm
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(983, 563);
            Controls.Add(AlertServiceTabs);
            Name = "AlertServiceForm";
            Text = "AlertServiceForm";
            AlertServiceTabs.ResumeLayout(false);
            tabPage5.ResumeLayout(false);
            tabPage5.PerformLayout();
            tabPage6.ResumeLayout(false);
            tabPage6.PerformLayout();
            tabPage8.ResumeLayout(false);
            tabPage8.PerformLayout();
            tabPage10.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)VariablesDataGRID).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private TabControl AlertServiceTabs;
        private TabPage tabPage5;
        private Label label22;
        private ComboBox ASMAlertConfigType;
        private ComboBox ASMConnection;
        private Label label12;
        private RichTextBox ASMDesc;
        private Label label7;
        private Label label8;
        private Label label9;
        private RichTextBox ASMDataSourceDef;
        private Label label13;
        private RichTextBox ASMPostSendDataSourceDef;
        private Label label25;
        private Label label24;
        private Label label14;
        private ComboBox ASMAlertType;
        private ComboBox ASMDataSourceType;
        private ComboBox ASMPostSendDataSourceType;
        private TextBox ASMTitle;
        private TabPage tabPage6;
        private RichTextBox ASMFileOutput;
        private RichTextBox ASMEmailBody;
        private RichTextBox ASMAttachPath;
        private TextBox ASMEmailSubject;
        private TextBox ASMBcc;
        private TextBox ASMCc;
        private TextBox ASMEmailTo;
        private TextBox ASMAttachFileType;
        private ComboBox ASMAttachType;
        private CheckBox ASMAttachment;
        private Label label21;
        private Label label20;
        private Label label19;
        private Label label18;
        private Label label17;
        private Label label16;
        private Label label15;
        private Label label11;
        private Label label10;
        private TabPage tabPage8;
        private Label label32;
        private DateTimePicker ASDailyEndDate;
        private DateTimePicker ASDailyStartDate;
        private DateTimePicker ASEndDate;
        private DateTimePicker ASStartDate;
        private Label label23;
        private ComboBox ASMSchedular;
        private Label label35;
        private Label label34;
        private Label label33;
        private TabPage tabPage10;
        private Button AddVariablesButton;
        private Button SaveEmailConfigAll;
        private DataGridView VariablesDataGRID;
    }
}