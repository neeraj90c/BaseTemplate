namespace PushNotifications.Forms
{
    partial class AlertServiceVariablesForm
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
            SaveAllVariablesButton = new Button();
            ASVariableType = new ComboBox();
            ASVariableValue = new TextBox();
            ASVariableInstance = new TextBox();
            label38 = new Label();
            label37 = new Label();
            label36 = new Label();
            SuspendLayout();
            // 
            // SaveAllVariablesButton
            // 
            SaveAllVariablesButton.Location = new Point(157, 228);
            SaveAllVariablesButton.Name = "SaveAllVariablesButton";
            SaveAllVariablesButton.Size = new Size(136, 23);
            SaveAllVariablesButton.TabIndex = 71;
            SaveAllVariablesButton.Text = "Save Service";
            SaveAllVariablesButton.UseVisualStyleBackColor = true;
            SaveAllVariablesButton.Click += SaveAllVariablesButton_Click;
            // 
            // ASVariableType
            // 
            ASVariableType.FormattingEnabled = true;
            ASVariableType.Items.AddRange(new object[] { "INT", "STRING" });
            ASVariableType.Location = new Point(157, 119);
            ASVariableType.Name = "ASVariableType";
            ASVariableType.Size = new Size(257, 23);
            ASVariableType.TabIndex = 70;
            // 
            // ASVariableValue
            // 
            ASVariableValue.Location = new Point(157, 158);
            ASVariableValue.Name = "ASVariableValue";
            ASVariableValue.Size = new Size(257, 23);
            ASVariableValue.TabIndex = 68;
            // 
            // ASVariableInstance
            // 
            ASVariableInstance.Location = new Point(157, 81);
            ASVariableInstance.Name = "ASVariableInstance";
            ASVariableInstance.Size = new Size(257, 23);
            ASVariableInstance.TabIndex = 69;
            // 
            // label38
            // 
            label38.AutoSize = true;
            label38.Location = new Point(51, 125);
            label38.Name = "label38";
            label38.Size = new Size(81, 15);
            label38.TabIndex = 65;
            label38.Text = "Variable Type :";
            // 
            // label37
            // 
            label37.AutoSize = true;
            label37.Location = new Point(51, 164);
            label37.Name = "label37";
            label37.Size = new Size(85, 15);
            label37.TabIndex = 66;
            label37.Text = "Variable Value :";
            // 
            // label36
            // 
            label36.AutoSize = true;
            label36.Location = new Point(51, 87);
            label36.Name = "label36";
            label36.Size = new Size(101, 15);
            label36.TabIndex = 67;
            label36.Text = "Variable Instance :";
            // 
            // AlertServiceVariablesForm
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(493, 353);
            Controls.Add(SaveAllVariablesButton);
            Controls.Add(ASVariableType);
            Controls.Add(ASVariableValue);
            Controls.Add(ASVariableInstance);
            Controls.Add(label38);
            Controls.Add(label37);
            Controls.Add(label36);
            Name = "AlertServiceVariablesForm";
            Text = "AlertServiceVariablesForm";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Button SaveAllVariablesButton;
        private ComboBox ASVariableType;
        private TextBox ASVariableValue;
        private TextBox ASVariableInstance;
        private Label label38;
        private Label label37;
        private Label label36;
    }
}