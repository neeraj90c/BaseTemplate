namespace PushNotifications.Forms
{
    partial class EmailConfigForms
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
            SuspendLayout();
            // 
            // IDesc
            // 
            IDesc.Location = new Point(58, 59);
            IDesc.Name = "IDesc";
            IDesc.Size = new Size(395, 96);
            IDesc.TabIndex = 33;
            IDesc.Text = "";
            // 
            // saveEmailButton
            // 
            saveEmailButton.Location = new Point(353, 306);
            saveEmailButton.Name = "saveEmailButton";
            saveEmailButton.Size = new Size(100, 23);
            saveEmailButton.TabIndex = 32;
            saveEmailButton.Text = "Save Email";
            saveEmailButton.UseVisualStyleBackColor = true;
            saveEmailButton.Click += saveEmailButton_Click;
            // 
            // IsActive
            // 
            IsActive.AutoSize = true;
            IsActive.Location = new Point(307, 264);
            IsActive.Name = "IsActive";
            IsActive.Size = new Size(67, 19);
            IsActive.TabIndex = 31;
            IsActive.Text = "IsActive";
            IsActive.UseVisualStyleBackColor = true;
            // 
            // HtmlBody
            // 
            HtmlBody.AutoSize = true;
            HtmlBody.Location = new Point(213, 264);
            HtmlBody.Name = "HtmlBody";
            HtmlBody.Size = new Size(88, 19);
            HtmlBody.TabIndex = 30;
            HtmlBody.Text = "HTML Body";
            HtmlBody.UseVisualStyleBackColor = true;
            // 
            // EnableSSL
            // 
            EnableSSL.AutoSize = true;
            EnableSSL.Location = new Point(119, 264);
            EnableSSL.Name = "EnableSSL";
            EnableSSL.Size = new Size(82, 19);
            EnableSSL.TabIndex = 29;
            EnableSSL.Text = "Enable SSL";
            EnableSSL.UseVisualStyleBackColor = true;
            // 
            // label6
            // 
            label6.AutoSize = true;
            label6.Location = new Point(32, 238);
            label6.Name = "label6";
            label6.Size = new Size(63, 15);
            label6.TabIndex = 28;
            label6.Text = "Password :";
            // 
            // IPort
            // 
            IPort.Location = new Point(326, 175);
            IPort.Name = "IPort";
            IPort.Size = new Size(127, 23);
            IPort.TabIndex = 27;
            // 
            // IPassword
            // 
            IPassword.Location = new Point(119, 235);
            IPassword.Name = "IPassword";
            IPassword.Size = new Size(334, 23);
            IPassword.TabIndex = 26;
            IPassword.UseSystemPasswordChar = true;
            // 
            // IEmail
            // 
            IEmail.Location = new Point(119, 206);
            IEmail.Name = "IEmail";
            IEmail.Size = new Size(334, 23);
            IEmail.TabIndex = 25;
            // 
            // IHost
            // 
            IHost.Location = new Point(119, 177);
            IHost.Name = "IHost";
            IHost.Size = new Size(160, 23);
            IHost.TabIndex = 24;
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Location = new Point(32, 209);
            label5.Name = "label5";
            label5.Size = new Size(81, 15);
            label5.TabIndex = 23;
            label5.Text = "Sender Email :";
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(285, 178);
            label4.Name = "label4";
            label4.Size = new Size(35, 15);
            label4.TabIndex = 22;
            label4.Text = "Port :";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(32, 178);
            label3.Name = "label3";
            label3.Size = new Size(38, 15);
            label3.TabIndex = 21;
            label3.Text = "Host :";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(14, 59);
            label2.Name = "label2";
            label2.Size = new Size(38, 15);
            label2.TabIndex = 20;
            label2.Text = "Desc :";
            // 
            // IName
            // 
            IName.Location = new Point(58, 30);
            IName.Name = "IName";
            IName.Size = new Size(395, 23);
            IName.TabIndex = 19;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(14, 33);
            label1.Name = "label1";
            label1.Size = new Size(45, 15);
            label1.TabIndex = 18;
            label1.Text = "Name :";
            // 
            // EmailConfigForms
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(503, 423);
            Controls.Add(IDesc);
            Controls.Add(saveEmailButton);
            Controls.Add(IsActive);
            Controls.Add(HtmlBody);
            Controls.Add(EnableSSL);
            Controls.Add(label6);
            Controls.Add(IPort);
            Controls.Add(IPassword);
            Controls.Add(IEmail);
            Controls.Add(IHost);
            Controls.Add(label5);
            Controls.Add(label4);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(IName);
            Controls.Add(label1);
            Name = "EmailConfigForms";
            Text = "EmailConfigForms";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private RichTextBox IDesc;
        private Button saveEmailButton;
        private CheckBox IsActive;
        private CheckBox HtmlBody;
        private CheckBox EnableSSL;
        private Label label6;
        private TextBox IPort;
        private TextBox IPassword;
        private TextBox IEmail;
        private TextBox IHost;
        private Label label5;
        private Label label4;
        private Label label3;
        private Label label2;
        private TextBox IName;
        private Label label1;
    }
}