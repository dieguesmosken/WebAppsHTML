Attribute VB_Name = "General"
Option Explicit


Enum Orientacion
    Horizontal = 1
    Vertical = 2
End Enum

Enum Dimensiones
    Chico = 1
    Mediano = 2
    Grande = 3
End Enum
    

Public Const SND_ASYNC = &H1


Public Const TurnoHumano = 1
Public Const TurnoPC = 2


Public Const Ancho = 16 'Ancho de las celdas del tablero
Public Const Alto = 16

Public Const MAXDIRECCIONES = 2

Public WAVDIR As String
Public BMPDIR As String



Public fin As Boolean
Public ColorFondo As Long
Public ColorLineas As Long
Public Jugando As Boolean
Public Exito As Boolean
               


Public TableroHumano As cTablero
Public TableroComputadora As cTablero

Public MouseX As Integer
Public MouseY As Integer

Public Turno As Byte


Dim DirectX As DirectX7
Dim DirectDraW As DirectDraw7

Dim ddsMainSurface As DirectDrawSurface7
Dim ddsBackBuffer As DirectDrawSurface7

Dim Clipper As DirectDrawClipper
Dim r As RECT
Dim r2 As RECT

Public Declare Function sndPlaySound Lib "winmm.dll" Alias "sndPlaySoundA" (ByVal lpszSoundName As String, ByVal uFlags As Long) As Long
Public Declare Function ShellExecute Lib "shell32.dll" Alias "ShellExecuteA" (ByVal hWnd As Long, ByVal lpOperation As String, ByVal lpFile As String, ByVal lpParameters As String, ByVal lpDirectory As String, ByVal nShowCmd As Long) As Long



Sub IniciarDX()
On Error Resume Next

Set DirectX = New DirectX7
If Err Then
    MsgBox ("Asegurese de tener instalador DirectX 7.")
    End
End If

'Crea el objeto dd para dibujar
Set DirectDraW = DirectX.DirectDrawCreate("")
If Err Then
    MsgBox ("Error al iniciar DD, no se puede crear el objeto directdraw7.")
    End
End If

Call DirectDraW.SetCooperativeLevel(FrmMain.hWnd, DDSCL_NORMAL)

'Crea los surfaces donde se dibara el tablero
Call CrearSurfaces(ddsMainSurface, ddsBackBuffer, FrmMain.pbTablero.Width, FrmMain.pbTablero.Height, DirectDraW)

'Clipper para evitar errores cuando se esta dibujando el tablero
Call CrearClipper(Clipper, ddsMainSurface, FrmMain.pbTablero.hWnd, DirectDraW)

'---------Carga los BMP de los diferentes barcos-------
Call CargarSurfaceDesdeArchivo(DirectDraW, ddsBarcoChico(1), BMPDIR & "Barco16x16h.BMP")
Call CargarSurfaceDesdeArchivo(DirectDraW, ddsBarcoChico(2), BMPDIR & "Barco16x16v.BMP")

Call CargarSurfaceDesdeArchivo(DirectDraW, ddsBarcoMediano(1), BMPDIR & "Barco32x16h.BMP")
Call CargarSurfaceDesdeArchivo(DirectDraW, ddsBarcoMediano(2), BMPDIR & "Barco16x32v.BMP")

Call CargarSurfaceDesdeArchivo(DirectDraW, ddsBarcoGrande(1), BMPDIR & "Barco48x16h.BMP")
Call CargarSurfaceDesdeArchivo(DirectDraW, ddsBarcoGrande(2), BMPDIR & "Barco16x48v.BMP")
'---------Carga los BMP de los diferentes barcos-------

End Sub
Sub Main()
Dim dispx As Integer, dispy As Integer

WAVDIR = App.Path & "\WAV\"
BMPDIR = App.Path & "\BMP\"

Call IniciarDX

FrmMain.Show



Turno = TurnoHumano

Set TableroHumano = New cTablero

Set TableroComputadora = New cTablero

FrmMain.lbTurno.Caption = "Humano"
FrmMain.Command1.Enabled = False

Do While Not fin
    If Jugando Then
        If TableroHumano.PoniendoBarcos Then
            Call MostrarTableroHumano
            
        Else
            If Turno = TurnoHumano Then
               Call MostrarTableroPC(FrmConfig.FlagTrampa = vbChecked)
                
                
            Else
               Call MostrarTableroHumano
               
               
               Do While Not Exito
                    dispx = TableroComputadora.NumeroAlAzar(1, TableroHumano.LimX)
                    dispy = TableroComputadora.NumeroAlAzar(1, TableroHumano.LimY)
                    
                    If Not TableroHumano.Visitado(dispx, dispy) Then
                        If TableroHumano.DisparoAcertado(dispx, dispy) Then
                            If TableroHumano.Impactos(dispx, dispy) = TableroHumano.tamaño(dispx, dispy) Then
                                Call TableroHumano.BorrarBarco(dispx, dispy)
                            End If
                        End If
                        Exito = True
                    End If
               Loop
               
               FrmMain.Command1.Enabled = True
               
            End If
            
            
            
            FrmMain.txtuBarcos.Caption = "Barcos:" & TableroHumano.CantBarcosIntactos
            FrmMain.txtpcBarcos.Caption = "Barcos:" & TableroComputadora.CantBarcosIntactos
            Call ChequearVictoria
            
        End If
     
        
    End If
    DoEvents
Loop

Call LiberarRecursos

End Sub

Public Sub LiberarRecursos()
Dim frm As Form
Dim i As Integer

'Borra los objetos

For i = 1 To MAXDIRECCIONES
    Set ddsBarcoChico(i) = Nothing
    Set ddsBarcoMediano(i) = Nothing
    Set ddsBarcoGrande(i) = Nothing
Next i

Set Clipper = Nothing
Set ddsMainSurface = Nothing
Set ddsBackBuffer = Nothing
Set DirectX = Nothing
Set TableroHumano = Nothing
Set TableroComputadora = Nothing

'Descarga los formularios
For Each frm In Forms
 Unload frm
Next

End Sub

Sub PlayWaveAPI(File As String)

On Error Resume Next
Dim rc As Integer

rc = sndPlaySound(File, SND_ASYNC)

End Sub

Public Sub MostrarTableroHumano(Optional ByVal Mensaje As String = "")
Call ddsBackBuffer.BltColorFill(r, ColorFondo)
Call TableroHumano.DibujarCasillas(ddsBackBuffer)
Call TableroHumano.DibujarBarcos(ddsBackBuffer)

If Mensaje <> "" Then
    Call DrawText(ddsBackBuffer, 1, 1, Mensaje, vbRed)
End If

Call DirectX.GetWindowRect(FrmMain.pbTablero.hWnd, r2)
r2.Left = r2.Left + 2
r2.Top = r2.Top + 2
Call ddsMainSurface.Blt(r2, ddsBackBuffer, r, DDBLT_WAIT)
End Sub

Public Sub MostrarTableroPC(ByVal Trampa As Boolean, Optional ByVal Mensaje As String = "")
Call ddsBackBuffer.BltColorFill(r, ColorFondo)
Call TableroComputadora.DibujarCasillas(ddsBackBuffer)
If Trampa Then Call TableroComputadora.DibujarBarcos(ddsBackBuffer)

If Mensaje <> "" Then
    Call DrawText(ddsBackBuffer, 1, 1, Mensaje, vbRed)
End If

Call DirectX.GetWindowRect(FrmMain.pbTablero.hWnd, r2)
r2.Left = r2.Left + 2
r2.Top = r2.Top + 2
Call ddsMainSurface.Blt(r2, ddsBackBuffer, r, DDBLT_WAIT)
End Sub

Public Sub EnviarMail(ByVal Email As String)

Dim Exito As Long

Exito = ShellExecute(0&, vbNullString, "mailto:" & Email, vbNullString, "C:\", 1)

End Sub

Private Sub ChequearVictoria()

If (TableroHumano.CantBarcosHundidos = TableroHumano.CantidadBarcos) Or _
   (TableroComputadora.CantBarcosHundidos = TableroComputadora.CantidadBarcos) Then
    
    If TableroHumano.CantBarcosHundidos = TableroHumano.CantidadBarcos Then
        MsgBox "¡Has perdido, la computadora a hundido todos tus barcos!"
    Else
        MsgBox "¡Felicidades, le has ganado la batalla a la computadora!"
    End If
    
    Jugando = False
    FrmMain.Estadisticas.Visible = False
    FrmMain.pbTablero.Visible = False
    
End If

End Sub

