const edge = require('edge-js')

const attendanceServices = require("../services/AttendanceService")

const demofunction = edge.func({
    source: function () {/*

        using System;
        using System.Text;
        using System.Data;
        using System.Threading.Tasks;
        using System.Windows.Forms;
        using System.Collections.Generic;
        using System.ComponentModel;
        using System.Threading;
        using System.Drawing;
        using System.IO;
        using System.Net;
        using System.Collections.Specialized;
        using DPFP.Capture;

        public class Startup : DPFP.Capture.EventHandler
        {
            delegate void Function();	// a simple delegate for marshalling calls from event handlers to the GUI thread
            public static String verifyStatus = "FAIL";
            public static String USERNAME = "";

            static TaskCompletionSource<object> tcs;
            public async Task<object> Invoke(dynamic input)
            {
                USERNAME  = input.username;
                return await Task.Run<object>(async () => {
                    Init();
                    Start();
                    return verifyStatus;
                });
            }

            protected virtual void Init()
            {
                try
                {
                    Capturer = new DPFP.Capture.Capture();

                    if ( null != Capturer )
                        Capturer.EventHandler = this;
                    else
                        MessageBox.Show("Can't initiate capture operation!", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);

                }
                catch
                {
                    MessageBox.Show("Can't initiate capture operation!", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }

            public static void ReleaseControl()
            {
                // multi-threaded; can be called from V8 or one of many CLR threads
                TaskCompletionSource<object> tmp = Interlocked.Exchange(ref tcs, null);
                if (tmp != null)
                {
                    tmp.SetResult(null);
                }
            }

            protected void Start()
            {
                if (null != Capturer)
                {
                    try
                    {
                        Capturer.StartCapture();
                        // Console.Read();
                        MessageBox.Show("Fingerprint reader ready, mohon tutup notifikasi ini jika sudah scan.", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    }
                    catch
                    {
                        // SetPrompt("Can't initiate capture!");
                    }
                }
            }

            #region EventHandler Members:
            public void OnComplete(object Capture, string ReaderSerialNumber, DPFP.Sample Sample)
            {
                Process(Sample);
            }

            public void OnFingerGone(object Capture, string ReaderSerialNumber)
            {
                // MessageBox.Show("The finger was removed from the fingerprint reader.", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }

            public void OnFingerTouch(object Capture, string ReaderSerialNumber)
            {
                // MessageBox.Show("Please continue rescan " + USERNAME, "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
                // MessageBox.Show("The fingerprint reader was touched.!", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }

            public void OnReaderConnect(object Capture, string ReaderSerialNumber)
            {
                // MessageBox.Show("The fingerprint reader was connected.", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }

            public void OnReaderDisconnect(object Capture, string ReaderSerialNumber)
            {
                verifyStatus = "The fingerprint reader was disconnected";
                // MessageBox.Show("The fingerprint reader was disconnected.", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }

            public void OnSampleQuality(object Capture, string ReaderSerialNumber, DPFP.Capture.CaptureFeedback CaptureFeedback)
            {
                MessageBox.Show("", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            #endregion


            protected virtual void Process(DPFP.Sample Sample)
            {
                string path = @"scans\\"+ USERNAME +".txt";
                using (StreamReader streamReader = new StreamReader(path))
                {
                    string readText = streamReader.ReadLine();
                    
                    DPFP.Template template = new DPFP.Template();
                    DPFP.Verification.Verification Verificator = new DPFP.Verification.Verification();
                    DPFP.FeatureSet features = ExtractFeatures(Sample, DPFP.Processing.DataPurpose.Verification);
                    DPFP.Verification.Verification.Result result = new DPFP.Verification.Verification.Result();

                    if (features != null)
                    {
                        try
                        {
                            byte[] b = Convert.FromBase64String(readText);
                            template.DeSerialize(b);
                            Verificator.Verify(features, template, ref result);

                            if (result.Verified)
                            {
                                // MessageBox.Show("The fingerprint was VERIFIED", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information, MessageBoxDefaultButton.Button2, MessageBoxOptions.ServiceNotification);
                                
                                AutoClosingMessageBox.Show("The fingerprint was VERIFIED.", "Information", 1500);
                                verifyStatus = "SUCCESS";
                            }
                            else
                            {
                                // MessageBox.Show("The fingerprint was NOT VERIFIED", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information, MessageBoxDefaultButton.Button2, MessageBoxOptions.ServiceNotification);

                                AutoClosingMessageBox.Show("The fingerprint was NOT VERIFIED.", "Information", 1500);
                                verifyStatus = "FAILED";
                            }
                        }
                        catch (Exception e)
                        {
                            MessageBox.Show(e.ToString());
                        }
                    }
                    else
                    {
                        MessageBox.Show("ARTHUR", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
            }

            protected DPFP.FeatureSet ExtractFeatures(DPFP.Sample Sample, DPFP.Processing.DataPurpose Purpose)
            {
                DPFP.Processing.FeatureExtraction Extractor = new DPFP.Processing.FeatureExtraction();
                DPFP.Capture.CaptureFeedback feedback = DPFP.Capture.CaptureFeedback.None;
                DPFP.FeatureSet features = new DPFP.FeatureSet();
                Extractor.CreateFeatureSet(Sample, Purpose, ref feedback, ref features);
                if (feedback == DPFP.Capture.CaptureFeedback.Good)
                    return features;
                else
                    return null;
            }

            private DPFP.Capture.Capture Capturer;
            private DPFP.Verification.Verification Verificator;

            public class AutoClosingMessageBox
            {
                System.Threading.Timer _timeoutTimer;
                string _caption;
                AutoClosingMessageBox(string text, string caption, int timeout)
                {
                    _caption = caption;
                    _timeoutTimer = new System.Threading.Timer(OnTimerElapsed, null, timeout, System.Threading.Timeout.Infinite);
                    using(_timeoutTimer)
                    MessageBox.Show(text, caption, MessageBoxButtons.OK, MessageBoxIcon.Information, MessageBoxDefaultButton.Button2, MessageBoxOptions.ServiceNotification);
                }

                public static void Show(string text, string caption, int timeout)
                {
                    new AutoClosingMessageBox(text, caption, timeout);
                }

                void OnTimerElapsed(object state)
                {
                    IntPtr mbWnd = FindWindow("#32770", _caption); // lpClassName is #32770 for MessageBox
                    if(mbWnd != IntPtr.Zero)
                        SendMessage(mbWnd, WM_CLOSE, IntPtr.Zero, IntPtr.Zero);
                    _timeoutTimer.Dispose();
                }
                const int WM_CLOSE = 0x0010;
                [System.Runtime.InteropServices.DllImport("user32.dll", SetLastError = true)]
                static extern IntPtr FindWindow(string lpClassName, string lpWindowName);
                [System.Runtime.InteropServices.DllImport("user32.dll", CharSet = System.Runtime.InteropServices.CharSet.Auto)]
                static extern IntPtr SendMessage(IntPtr hWnd, UInt32 Msg, IntPtr wParam, IntPtr lParam);
            }

        }
    */},
    references: [
        'System.Data.dll',
        'System.Windows.Forms.dll',
        'System.Drawing.dll',
        'System.IO.dll',
        'Bin\\DPFPCtlXTypeLibNET.dll',
        'Bin\\DPFPCtlXWrapperNET.dll',
        'Bin\\DPFPDevNET.dll',
        'Bin\\DPFPEngNET.dll',
        'Bin\\DPFPGuiNET.dll',
        'Bin\\DPFPShrNET.dll',
        'Bin\\DPFPShrXTypeLibNET.dll',
        'Bin\\DPFPVerNET.dll'
    ]
});

const args = process.argv.slice(2)

if (args.length < 2) {
    console.log(`NIK tidak diketahui..`)
    process.exit()
}

const username = args[0]
const code = args[1]
const token = args[2]

initFunction = async () => {
    demofunction({ username, token }, async (err, result) => {
        if (err) throw err

        if (result === 'SUCCESS') {
            const response = await attendanceServices.attendance(username, code, token)
            console.log(JSON.stringify(response.data))
        } else {
            console.log(JSON.stringify({
                code: 500,
                status: false,
                message: result
            }))
        }
    })
}

initFunction()

// var controller = createController(null, true);
// controller.yieldControl();
// console.log('Control over process lifetime yielded to CLR, the process will not exit...');
