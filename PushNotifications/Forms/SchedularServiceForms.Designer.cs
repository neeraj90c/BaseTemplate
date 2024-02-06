namespace PushNotifications.Forms
{
    partial class SchedularServiceForms
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
            SSActiveCheckbox = new CheckBox();
            SaveSchedularButton = new Button();
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
            SuspendLayout();
            // 
            // SSActiveCheckbox
            // 
            SSActiveCheckbox.AutoSize = true;
            SSActiveCheckbox.Location = new Point(149, 273);
            SSActiveCheckbox.Name = "SSActiveCheckbox";
            SSActiveCheckbox.Size = new Size(67, 19);
            SSActiveCheckbox.TabIndex = 19;
            SSActiveCheckbox.Text = "IsActive";
            SSActiveCheckbox.UseVisualStyleBackColor = true;
            // 
            // SaveSchedularButton
            // 
            SaveSchedularButton.Location = new Point(323, 305);
            SaveSchedularButton.Name = "SaveSchedularButton";
            SaveSchedularButton.Size = new Size(166, 23);
            SaveSchedularButton.TabIndex = 18;
            SaveSchedularButton.Text = "Save Schedular";
            SaveSchedularButton.UseVisualStyleBackColor = true;
            SaveSchedularButton.Click += SaveSchedularButton_Click;
            // 
            // SSTypeComboBox
            // 
            SSTypeComboBox.FormattingEnabled = true;
            SSTypeComboBox.Items.AddRange(new object[] { "Recurring", "Single" });
            SSTypeComboBox.Location = new Point(149, 231);
            SSTypeComboBox.Name = "SSTypeComboBox";
            SSTypeComboBox.Size = new Size(340, 23);
            SSTypeComboBox.TabIndex = 17;
            // 
            // SSDescTextBox
            // 
            SSDescTextBox.Location = new Point(92, 74);
            SSDescTextBox.Name = "SSDescTextBox";
            SSDescTextBox.Size = new Size(397, 112);
            SSDescTextBox.TabIndex = 16;
            SSDescTextBox.Text = "";
            // 
            // SSFrequencyTextBox
            // 
            SSFrequencyTextBox.Location = new Point(149, 192);
            SSFrequencyTextBox.Name = "SSFrequencyTextBox";
            SSFrequencyTextBox.Size = new Size(340, 23);
            SSFrequencyTextBox.TabIndex = 13;
            // 
            // SSCodeTextBox
            // 
            SSCodeTextBox.Location = new Point(66, 45);
            SSCodeTextBox.Name = "SSCodeTextBox";
            SSCodeTextBox.Size = new Size(423, 23);
            SSCodeTextBox.TabIndex = 14;
            // 
            // SSNameTextBox
            // 
            SSNameTextBox.Location = new Point(66, 16);
            SSNameTextBox.Name = "SSNameTextBox";
            SSNameTextBox.Size = new Size(423, 23);
            SSNameTextBox.TabIndex = 15;
            // 
            // label30
            // 
            label30.AutoSize = true;
            label30.Location = new Point(8, 233);
            label30.Name = "label30";
            label30.Size = new Size(92, 15);
            label30.TabIndex = 12;
            label30.Text = "Schedular Type :";
            // 
            // label29
            // 
            label29.AutoSize = true;
            label29.Location = new Point(8, 195);
            label29.Name = "label29";
            label29.Size = new Size(135, 15);
            label29.TabIndex = 8;
            label29.Text = "Frequency (In Minutes) :";
            // 
            // label28
            // 
            label28.AutoSize = true;
            label28.Location = new Point(13, 75);
            label28.Name = "label28";
            label28.Size = new Size(73, 15);
            label28.TabIndex = 9;
            label28.Text = "Description :";
            // 
            // label27
            // 
            label27.AutoSize = true;
            label27.Location = new Point(13, 48);
            label27.Name = "label27";
            label27.Size = new Size(41, 15);
            label27.TabIndex = 10;
            label27.Text = "Code :";
            // 
            // label26
            // 
            label26.AutoSize = true;
            label26.Location = new Point(13, 20);
            label26.Name = "label26";
            label26.Size = new Size(45, 15);
            label26.TabIndex = 11;
            label26.Text = "Name :";
            // 
            // SchedularServiceForms
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(518, 365);
            Controls.Add(SSActiveCheckbox);
            Controls.Add(SaveSchedularButton);
            Controls.Add(SSTypeComboBox);
            Controls.Add(SSDescTextBox);
            Controls.Add(SSFrequencyTextBox);
            Controls.Add(SSCodeTextBox);
            Controls.Add(SSNameTextBox);
            Controls.Add(label30);
            Controls.Add(label29);
            Controls.Add(label28);
            Controls.Add(label27);
            Controls.Add(label26);
            Name = "SchedularServiceForms";
            Text = "SchedularServiceForms";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private CheckBox SSActiveCheckbox;
        private Button SaveSchedularButton;
        private ComboBox SSTypeComboBox;
        private RichTextBox SSDescTextBox;
        private TextBox SSFrequencyTextBox;
        private TextBox SSCodeTextBox;
        private TextBox SSNameTextBox;
        private Label label30;
        private Label label29;
        private Label label28;
        private Label label27;
        private Label label26;
    }
}