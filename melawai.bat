@echo off

@mode con cols=100 lines=25

echo Silahkan Pilih menu Absen di bawah ini : 
echo 1. Absen Datang
echo 2. Absen Pulang
echo 3. Pembuatan Finger Print
echo 4. Cek Kehadiran Hari Ini

set /p menu= "Menu : "
set /p nik= "Mohon masukan NIK anda : "

if %menu% == 1 goto 1
if %menu% == 2 goto 2
if %menu% == 3 goto 3
if %menu% == 4 goto 4

:1
cls
echo Memilih menu Absen Datang..
echo:
@REM pause > nul
call node clockIn.js %nik% CLOCK_IN
timeout /t 10
start melawai.bat
exit

:2
cls
echo Memilih menu Absen Pulang..
echo:
@REM pause > nul
call node clockOut.js %nik% CLOCK_OUT
timeout /t 10
start melawai.bat
exit

:3
cls
echo Pastikan jari tangan bersih..
echo:
@REM pause > nul
call node CaptureFinger.js %nik%
timeout /t 10
start melawai.bat
exit

:4
cls
echo Memilih menu Cek Kehadiran Hari Ini..
echo:
@REM pause > nul
call node AttendanceCheck.js %nik%
timeout /t 10
start melawai.bat
exit