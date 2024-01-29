using PushNotification;
using PushNotifications.Forms;
using System.Configuration;

namespace PushNotifications
{
    internal static class Program
    {

        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            // To customize application configuration such as set high DPI settings or default font,
            // see https://aka.ms/applicationconfiguration.
            ApplicationConfiguration.Initialize();
            StartupService startupService = new StartupService();
            startupService.OnServiceStart();
            //Application.Run(new ServiceList());
            Application.Run(new AlertService());
        }
    }
}