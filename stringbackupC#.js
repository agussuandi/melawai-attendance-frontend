// byte[] serializedTemplate = null;
                                    // Enroller.Template.Serialize(ref serializedTemplate);

                                    // string result = System.Text.Encoding.UTF8.GetString(serializedTemplate);
                                    // Console.Write(result);
                                    // verifyStatus = result;

                                    byte[] byted;
                                    // this.Invoke(new Function(delegate ()
                                    // {
                                        MemoryStream fingerprintData = new MemoryStream();
                                        Enroller.Template.Serialize(fingerprintData);
                                        byted = fingerprintData.ToArray();

                                        //insert your mysql command here then
                                    // }));

                                    
                                    foreach(var item in byted)
                                    {
                                        Console.WriteLine(item.ToString());
                                    }

                                    verifyStatus = byted.ToString();

                                    // Console.Write(serializedTemplate.GetType())

                                    // if (serializedTemplate != null)
                                    // {
                                        // string result = System.Text.Encoding.UTF8.GetString(serializedTemplate);
                                        // Console.Write(result);
                                        
                                        // string result = System.Text.Encoding.UTF8.GetString(serializedTemplate);
                                        // string utf16ByteArray = System.Text.Encoding.GetEncoding("utf-16").GetBytes(result);
                                        // Console.Write(utf16ByteArray);

                                        // var inputAsString = System.Text.Encoding.UTF8.GetString(serializedTemplate);
                                        // var utf16ByteArray = System.Text.Encoding.GetEncoding("utf-16").GetBytes(inputAsString);
                                        // Console.Write(serializedTemplate);
                                    // }







                                    // using (StreamWriter writetext = new StreamWriter(path))
                // {
                //     writetext.WriteLine(Convert.ToBase64String(Sample.Bytes));
                // }

                string path = @"D:\test.txt";
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
                            byte[] fingerprint = Convert.FromBase64String(readText);
                            template.DeSerialize(fingerprint);
                            Verificator.Verify(features, template, ref result);

                            if (result.Verified)
                            {
                                MessageBox.Show("1", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                            else
                            {
                                MessageBox.Show("0", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
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