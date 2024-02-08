namespace PushNotifications.Forms
{
    partial class DBConnectionForm
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
            DBPassTextBox = new TextBox();
            CDBNameTextBox = new TextBox();
            CUNameTextBox = new TextBox();
            SNameTextBox = new TextBox();
            SaveConnectionButton = new Button();
            CIsActiveCheckbox = new CheckBox();
            CNameTextBox = new TextBox();
            DBPassLabel = new Label();
            CDBNameLabel = new Label();
            CUNameLabel = new Label();
            SNameLabel = new Label();
            ConnectionNameLabel = new Label();
            SuspendLayout();
            // 
            // DBPassTextBox
            // 
            DBPassTextBox.Location = new Point(131, 151);
            DBPassTextBox.Name = "DBPassTextBox";
            DBPassTextBox.Size = new Size(321, 23);
            DBPassTextBox.TabIndex = 28;
            DBPassTextBox.UseSystemPasswordChar = true;
            // 
            // CDBNameTextBox
            // 
            CDBNameTextBox.Location = new Point(131, 85);
            CDBNameTextBox.Name = "CDBNameTextBox";
            CDBNameTextBox.Size = new Size(321, 23);
            CDBNameTextBox.TabIndex = 27;
            // 
            // CUNameTextBox
            // 
            CUNameTextBox.Location = new Point(131, 122);
            CUNameTextBox.Name = "CUNameTextBox";
            CUNameTextBox.Size = new Size(321, 23);
            CUNameTextBox.TabIndex = 26;
            // 
            // SNameTextBox
            // 
            SNameTextBox.Location = new Point(131, 53);
            SNameTextBox.Name = "SNameTextBox";
            SNameTextBox.Size = new Size(321, 23);
            SNameTextBox.TabIndex = 25;
            // 
            // SaveConnectionButton
            // 
            SaveConnectionButton.Location = new Point(322, 210);
            SaveConnectionButton.Name = "SaveConnectionButton";
            SaveConnectionButton.Size = new Size(130, 23);
            SaveConnectionButton.TabIndex = 24;
            SaveConnectionButton.Text = "Save Connection";
            SaveConnectionButton.UseVisualStyleBackColor = true;
            SaveConnectionButton.Click += SaveConnectionButton_Click;
            // 
            // CIsActiveCheckbox
            // 
            CIsActiveCheckbox.AutoSize = true;
            CIsActiveCheckbox.Location = new Point(131, 192);
            CIsActiveCheckbox.Name = "CIsActiveCheckbox";
            CIsActiveCheckbox.Size = new Size(67, 19);
            CIsActiveCheckbox.TabIndex = 23;
            CIsActiveCheckbox.Text = "IsActive";
            CIsActiveCheckbox.UseVisualStyleBackColor = true;
            // 
            // CNameTextBox
            // 
            CNameTextBox.Location = new Point(131, 22);
            CNameTextBox.Name = "CNameTextBox";
            CNameTextBox.Size = new Size(321, 23);
            CNameTextBox.TabIndex = 22;
            // 
            // DBPassLabel
            // 
            DBPassLabel.AutoSize = true;
            DBPassLabel.Location = new Point(18, 154);
            DBPassLabel.Name = "DBPassLabel";
            DBPassLabel.Size = new Size(63, 15);
            DBPassLabel.TabIndex = 21;
            DBPassLabel.Text = "Password :";
            // 
            // CDBNameLabel
            // 
            CDBNameLabel.AutoSize = true;
            CDBNameLabel.Location = new Point(18, 88);
            CDBNameLabel.Name = "CDBNameLabel";
            CDBNameLabel.Size = new Size(63, 15);
            CDBNameLabel.TabIndex = 20;
            CDBNameLabel.Text = "DB Name :";
            // 
            // CUNameLabel
            // 
            CUNameLabel.AutoSize = true;
            CUNameLabel.Location = new Point(18, 125);
            CUNameLabel.Name = "CUNameLabel";
            CUNameLabel.Size = new Size(68, 15);
            CUNameLabel.TabIndex = 19;
            CUNameLabel.Text = "UserName :";
            // 
            // SNameLabel
            // 
            SNameLabel.AutoSize = true;
            SNameLabel.Location = new Point(18, 56);
            SNameLabel.Name = "SNameLabel";
            SNameLabel.Size = new Size(77, 15);
            SNameLabel.TabIndex = 18;
            SNameLabel.Text = "ServerName :";
            // 
            // ConnectionNameLabel
            // 
            ConnectionNameLabel.AutoSize = true;
            ConnectionNameLabel.Location = new Point(18, 22);
            ConnectionNameLabel.Name = "ConnectionNameLabel";
            ConnectionNameLabel.Size = new Size(107, 15);
            ConnectionNameLabel.TabIndex = 17;
            ConnectionNameLabel.Text = "ConnectionName :";
            // 
            // DBConnectionForm
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(499, 309);
            Controls.Add(DBPassTextBox);
            Controls.Add(CDBNameTextBox);
            Controls.Add(CUNameTextBox);
            Controls.Add(SNameTextBox);
            Controls.Add(SaveConnectionButton);
            Controls.Add(CIsActiveCheckbox);
            Controls.Add(CNameTextBox);
            Controls.Add(DBPassLabel);
            Controls.Add(CDBNameLabel);
            Controls.Add(CUNameLabel);
            Controls.Add(SNameLabel);
            Controls.Add(ConnectionNameLabel);
            Name = "DBConnectionForm";
            Text = "DBConnectionForm";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private TextBox DBPassTextBox;
        private TextBox CDBNameTextBox;
        private TextBox CUNameTextBox;
        private TextBox SNameTextBox;
        private Button SaveConnectionButton;
        private CheckBox CIsActiveCheckbox;
        private TextBox CNameTextBox;
        private Label DBPassLabel;
        private Label CDBNameLabel;
        private Label CUNameLabel;
        private Label SNameLabel;
        public Label ConnectionNameLabel;
    }
}