const edge = require('edge-js')
const axios = require('axios')
const fs = require('fs')
var FormData = require('form-data')

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
            public static String verifyStatus = "FAIL";
            public static String nik = "";
            public async Task<object> Invoke(dynamic input)
            {
                nik = input.nik;
                return await Task.Run<object>(async () => {
                    Init();
                    Start();
                    return verifyStatus;
                    return "Enrollment Process Complete " + input.ToString();
                });
            }


            protected virtual void Init()
            {
                try
                {
                    Enroller = new DPFP.Processing.Enrollment();			// Create an enrollment.
                    Capturer = new DPFP.Capture.Capture();				// Create a capture operation.

                    if ( null != Capturer )
                        Capturer.EventHandler = this;					// Subscribe for capturing events.
                    else
                        MessageBox.Show("Can't initiate capture operation!", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);

                }
                catch
                {
                    MessageBox.Show("Can't initiate capture operation!", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }

            protected void Start()
            {
                if (null != Capturer)
                {
                    try
                    {
                        Capturer.StartCapture();
                        MessageBox.Show("Using the fingerprint reader, scan your fingerprint.!", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
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
                // string path = @"D:\test.txt";
                // using (StreamWriter writetext = new StreamWriter(path))
                // {
                //     writetext.WriteLine(Convert.ToBase64String(Sample.Bytes));
                // }

                //sample web call - begin
                // string URI = "http://192.168.0.101:3030/staffCheckIn";
                // string myParameters = "nik=chiewfei&action=punchin";

                // using (WebClient wc = new WebClient())
                // {
                //     wc.Headers[HttpRequestHeader.ContentType] = "application/x-www-form-urlencoded";
                //     string HtmlResult = wc.UploadString(URI, myParameters);
                // }
                //sample web call = end
            }

            public void OnFingerGone(object Capture, string ReaderSerialNumber)
            {
                // MessageBox.Show("The finger was removed from the fingerprint reader.", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }

            public void OnFingerTouch(object Capture, string ReaderSerialNumber)
            {
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
                try
                {
                    DPFP.FeatureSet features = ExtractFeatures(Sample, DPFP.Processing.DataPurpose.Enrollment);
                    if (features != null)
                        try
                        {
                            Enroller.AddFeatures(features);		// Add feature set to template.
                        }
                        finally
                        {
                            switch(Enroller.TemplateStatus)
                            {
                                case DPFP.Processing.Enrollment.Status.Ready:	// report success and stop capturing
                                
                                    byte [] serializedTemplate = new byte [1632];
                                    Enroller.Template.Serialize(ref serializedTemplate);
                                    string result = Convert.ToBase64String(serializedTemplate);

                                    // MessageBox.Show(result, "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);

                                    string path = @"scans\\"+ nik +".txt";
                                    using (StreamWriter writetext = new StreamWriter(path))
                                    {
                                        writetext.WriteLine(result);
                                    }

                                    MessageBox.Show( "FingerPrint Capture Complete " + nik, "Information", MessageBoxButtons.OK, MessageBoxIcon.Information, MessageBoxDefaultButton.Button2, MessageBoxOptions.ServiceNotification);
                                    verifyStatus = "SUCCESS";

                                    // String fileName = "scans\\"+ nik +".fpt";
                                    // using (FileStream fs = File.Open(fileName, FileMode.Create, FileAccess.Write)) {
                                    //     Enroller.Template.Serialize(fs);
                                    //     verifyStatus = "SUCCESS";
                                    // }
                                break;
                                case DPFP.Processing.Enrollment.Status.Insufficient:	// report success and stop capturing
                                    MessageBox.Show( "Please continue rescan " + nik, "Information", MessageBoxButtons.OK, MessageBoxIcon.Information, MessageBoxDefaultButton.Button2, MessageBoxOptions.ServiceNotification);
                                    verifyStatus = "FAILED";
                                break;
                            }
                        }
                    }
                catch (Exception e)
                {
                    MessageBox.Show(e.ToString());
                }
            }

            protected DPFP.FeatureSet ExtractFeatures(DPFP.Sample Sample, DPFP.Processing.DataPurpose Purpose)
            {
                DPFP.Processing.FeatureExtraction Extractor = new DPFP.Processing.FeatureExtraction();	// Create a feature extractor
                DPFP.Capture.CaptureFeedback feedback = DPFP.Capture.CaptureFeedback.None;
                DPFP.FeatureSet features = new DPFP.FeatureSet();
                Extractor.CreateFeatureSet(Sample, Purpose, ref feedback, ref features);			// TODO: return features as a result?
                if (feedback == DPFP.Capture.CaptureFeedback.Good)
                    return features;
                else
                    return null;
            }

            private DPFP.Capture.Capture Capturer;
            private DPFP.Template Template;
            private DPFP.Processing.Enrollment Enroller;
        }
    */},
    references: [
        'System.Data.dll',
        'System.Windows.Forms.dll',
        'System.Drawing.dll',
        'System.IO.dll',
        'System.Net.dll',
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

if (args.length < 3) {
    console.log(`NIK tidak diketahui..`)
    process.exit()
}

const nik = args[0]
const name = args[1]
const token = args[2]

demofunction({ nik, name, token }, async (err, result) => {
    if (err) throw err
    if (result === 'SUCCESS') {
        const response = await attendanceServices.fingerPrintStore(nik, name, token)
        console.log(JSON.stringify(response.data))
    } else {
        console.log(JSON.stringify({
            code: 500,
            status: false,
            message: result
        }))
    }
});

// var nik = "agus"
// demofunction({
//   nik,
// }, function (err, result) {
//   if (err) {
//     throw err;
//   }
//   console.log(result);

//   // // upload files
//   // var newFile = fs.createReadStream("scans\\"+ nik +".fpt");
//   // var url = "http://192.168.0.101:3030/upload-FingerPrint"
//   // var form = new FormData();
//   //
//   // form.append("file", newFile)
//   // form.append("name", nik)
//   // axios.post(url,
//   //   form,
//   //   { headers: {...form.getHeaders()} }
//   // )
//   // .catch((err)=>{
//   //   console.log({err})
//   // })

// });