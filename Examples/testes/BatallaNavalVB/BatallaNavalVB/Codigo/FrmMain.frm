VERSION 5.00
Begin VB.Form FrmMain 
   BackColor       =   &H80000010&
   BorderStyle     =   1  'Fixed Single
   Caption         =   "Batalla Naval"
   ClientHeight    =   6345
   ClientLeft      =   150
   ClientTop       =   435
   ClientWidth     =   7890
   BeginProperty Font 
      Name            =   "MS Sans Serif"
      Size            =   9.75
      Charset         =   0
      Weight          =   700
      Underline       =   0   'False
      Italic          =   0   'False
      Strikethrough   =   0   'False
   EndProperty
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   ScaleHeight     =   423
   ScaleMode       =   3  'Pixel
   ScaleWidth      =   526
   StartUpPosition =   2  'CenterScreen
   Begin VB.Frame Estadisticas 
      Caption         =   "Estatísticas"
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   8.25
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   6015
      Left            =   6240
      TabIndex        =   12
      Top             =   120
      Visible         =   0   'False
      Width           =   1575
      Begin VB.CommandButton Command1 
         Caption         =   "Seguir"
         BeginProperty Font 
            Name            =   "MS Sans Serif"
            Size            =   8.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   255
         Left            =   240
         TabIndex        =   17
         Top             =   5640
         Width           =   1095
      End
      Begin VB.Label lbTurno 
         AutoSize        =   -1  'True
         Caption         =   "Usuario"
         Height          =   240
         Left            =   120
         TabIndex        =   19
         Top             =   5040
         Width           =   825
      End
      Begin VB.Label Label3 
         Caption         =   "Turno:"
         Height          =   255
         Left            =   360
         TabIndex        =   18
         Top             =   4680
         Width           =   735
      End
      Begin VB.Label Label1 
         AutoSize        =   -1  'True
         Caption         =   "Usuario"
         BeginProperty Font 
            Name            =   "MS Sans Serif"
            Size            =   8.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   195
         Left            =   360
         TabIndex        =   16
         Top             =   360
         Width           =   660
      End
      Begin VB.Label txtuBarcos 
         AutoSize        =   -1  'True
         Caption         =   "Barcos:"
         BeginProperty Font 
            Name            =   "MS Sans Serif"
            Size            =   8.25
            Charset         =   0
            Weight          =   400
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   195
         Left            =   120
         TabIndex        =   15
         Top             =   720
         Width           =   540
      End
      Begin VB.Label Label2 
         AutoSize        =   -1  'True
         Caption         =   "Computador"
         BeginProperty Font 
            Name            =   "MS Sans Serif"
            Size            =   8.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   195
         Left            =   240
         TabIndex        =   14
         Top             =   1320
         Width           =   1020
      End
      Begin VB.Label txtpcBarcos 
         AutoSize        =   -1  'True
         Caption         =   "Barcos:"
         BeginProperty Font 
            Name            =   "MS Sans Serif"
            Size            =   8.25
            Charset         =   0
            Weight          =   400
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   195
         Left            =   120
         TabIndex        =   13
         Top             =   1800
         Width           =   540
      End
   End
   Begin VB.Frame Config 
      Caption         =   "Barcos"
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   8.25
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   6015
      Left            =   6240
      TabIndex        =   1
      Top             =   120
      Visible         =   0   'False
      Width           =   1575
      Begin VB.Frame Frame2 
         Caption         =   "Tamanho"
         BeginProperty Font 
            Name            =   "MS Sans Serif"
            Size            =   8.25
            Charset         =   0
            Weight          =   400
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   1935
         Left            =   120
         TabIndex        =   8
         Top             =   360
         Width           =   1335
         Begin VB.OptionButton oTamaño 
            Caption         =   "Pequeno"
            BeginProperty Font 
               Name            =   "MS Sans Serif"
               Size            =   8.25
               Charset         =   0
               Weight          =   400
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Index           =   0
            Left            =   240
            TabIndex        =   11
            Top             =   480
            Value           =   -1  'True
            Width           =   975
         End
         Begin VB.OptionButton oTamaño 
            Caption         =   "Médio"
            BeginProperty Font 
               Name            =   "MS Sans Serif"
               Size            =   8.25
               Charset         =   0
               Weight          =   400
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Index           =   1
            Left            =   240
            TabIndex        =   10
            Top             =   840
            Width           =   975
         End
         Begin VB.OptionButton oTamaño 
            Caption         =   "Grande"
            BeginProperty Font 
               Name            =   "MS Sans Serif"
               Size            =   8.25
               Charset         =   0
               Weight          =   400
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Index           =   2
            Left            =   240
            TabIndex        =   9
            Top             =   1200
            Width           =   975
         End
      End
      Begin VB.Frame Frame1 
         Caption         =   "Direção"
         BeginProperty Font 
            Name            =   "MS Sans Serif"
            Size            =   8.25
            Charset         =   0
            Weight          =   400
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   1455
         Left            =   120
         TabIndex        =   5
         Top             =   2400
         Width           =   1335
         Begin VB.OptionButton oOrient 
            Caption         =   "Vertical"
            BeginProperty Font 
               Name            =   "MS Sans Serif"
               Size            =   8.25
               Charset         =   0
               Weight          =   400
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   255
            Index           =   1
            Left            =   120
            TabIndex        =   7
            Top             =   840
            Width           =   1095
         End
         Begin VB.OptionButton oOrient 
            Caption         =   "Horizontal"
            BeginProperty Font 
               Name            =   "MS Sans Serif"
               Size            =   8.25
               Charset         =   0
               Weight          =   400
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   255
            Index           =   0
            Left            =   120
            TabIndex        =   6
            Top             =   360
            Value           =   -1  'True
            Width           =   1095
         End
      End
      Begin VB.CommandButton CmdListo 
         Caption         =   "Listo"
         Enabled         =   0   'False
         BeginProperty Font 
            Name            =   "MS Sans Serif"
            Size            =   8.25
            Charset         =   0
            Weight          =   400
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         Left            =   120
         TabIndex        =   4
         Top             =   5520
         Width           =   1215
      End
      Begin VB.Label lbLibres 
         AutoSize        =   -1  'True
         Caption         =   "Livres:"
         BeginProperty Font 
            Name            =   "MS Sans Serif"
            Size            =   8.25
            Charset         =   0
            Weight          =   400
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   195
         Left            =   240
         TabIndex        =   3
         Top             =   4080
         Width           =   465
      End
      Begin VB.Label lbAsignados 
         AutoSize        =   -1  'True
         Caption         =   "Aginados:"
         BeginProperty Font 
            Name            =   "MS Sans Serif"
            Size            =   8.25
            Charset         =   0
            Weight          =   400
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   195
         Left            =   240
         TabIndex        =   2
         Top             =   4440
         Width           =   705
      End
   End
   Begin VB.PictureBox pbTablero 
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   8.25
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   6030
      Left            =   120
      ScaleHeight     =   398
      ScaleMode       =   3  'Pixel
      ScaleWidth      =   397
      TabIndex        =   0
      Top             =   120
      Visible         =   0   'False
      Width           =   6015
   End
   Begin VB.Menu mnuMain 
      Caption         =   "Batalha Naval"
      Begin VB.Menu mnuNueva 
         Caption         =   "Nova partida"
      End
      Begin VB.Menu mnuAband 
         Caption         =   "Abandonar partida"
      End
      Begin VB.Menu mnuConfig 
         Caption         =   "Configurar"
      End
      Begin VB.Menu mnuAbout 
         Caption         =   "Acerca de"
      End
      Begin VB.Menu mnuSalir 
         Caption         =   "Sair"
      End
   End
End
Attribute VB_Name = "FrmMain"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
'I did this little game as an final test of the subject
'"programacion de computadoras" at the university.

'Please feel free to contact me at
'pablomarquez@noland-studios.com.ar or
'gulfas_morgolock@hotmail.com

Option Explicit

Private Sub CmdListo_Click()
Config.Visible = False
txtuBarcos.Caption = "Barcos:" & TableroHumano.CantBarcosIntactos
txtpcBarcos.Caption = "Barcos:" & TableroComputadora.CantBarcosIntactos

Estadisticas.Visible = True
TableroHumano.PoniendoBarcos = False
TableroComputadora.ComputadoraPoneBarcosAlAzar
End Sub

Private Sub Command1_Click()

If Turno = TurnoPC Then
    Turno = TurnoHumano
    Exito = False
    Command1.Enabled = False
    lbTurno.Caption = "Humano"
Else
    Turno = TurnoPC
    lbTurno.Caption = "Computadora"
End If

End Sub

Private Sub Form_QueryUnload(Cancel As Integer, UnloadMode As Integer)

fin = True

End Sub

Private Sub mnuAband_Click()
Jugando = False
Estadisticas.Visible = False
pbTablero.Visible = False
Config.Visible = False
End Sub

Private Sub mnuAbout_Click()
frmAcerca.Show
End Sub

Private Sub mnuConfig_Click()

If Jugando Then
    FrmConfig.CdmAplicar.Enabled = False
    FrmConfig.CmdAplicarBarcos.Enabled = False
Else
    FrmConfig.CdmAplicar.Enabled = True
    FrmConfig.CmdAplicarBarcos.Enabled = True
End If

FrmConfig.Show

End Sub

Private Sub mnuNueva_Click()
Command1.Enabled = False
CmdListo.Enabled = False
pbTablero.Visible = True
TableroHumano.ResetTablero
TableroComputadora.ResetTablero
TableroHumano.PoniendoBarcos = True
FrmMain.Config.Visible = True
Estadisticas.Visible = False
Config.Visible = True
Jugando = True
lbLibres = "Barcos:" & TableroHumano.CantidadBarcos
lbAsignados = "Atribuidos:" & TableroHumano.CantBarcosAsignados
End Sub

Private Sub mnuSalir_Click()
fin = True
End Sub

Private Sub PonerBarco()
Dim tam As Byte, Orient As Byte
      
If oTamaño(0).Value = True Then
     tam = Chico
ElseIf oTamaño(1).Value = True Then
     tam = Mediano
Else
     tam = Grande
End If
        
If oOrient(0).Value = True Then
     Orient = Horizontal
Else
     Orient = Vertical
End If
        
If TableroHumano.PonerBarco(TableroHumano.CantBarcosAsignados + 1, tam, Orient, MouseX, MouseY) Then
     Call PlayWaveAPI(WAVDIR & "poner.wav")
Else
     Call PlayWaveAPI(WAVDIR & "error.wav")
End If
        
    
End Sub

Private Sub pbTablero_MouseDown(Button As Integer, Shift As Integer, x As Single, y As Single)

If Button = vbLeftButton Then ' boton izquierdo
    
    '¿Estamos asignado barcos?
    If TableroHumano.PoniendoBarcos Then
            '¿superamos el maximo de barcos?
            If TableroHumano.CantBarcosAsignados < _
               TableroHumano.CantidadBarcos Then
                  Call PonerBarco
                  lbLibres = "Barcos:" & TableroHumano.CantidadBarcos
                  lbAsignados = "Atribuidos:" & TableroHumano.CantBarcosAsignados
            End If
    Else
            If Turno = TurnoHumano Then
               If Not Command1.Enabled Then
                    If Not TableroComputadora.Visitado(MouseX, MouseY) Then
                         If TableroComputadora.DisparoAcertado(MouseX, MouseY) Then
                             If TableroComputadora.Impactos(MouseX, MouseY) = _
                                TableroComputadora.tamaño(MouseX, MouseY) Then
                                       Call TableroComputadora.BorrarBarco(MouseX, MouseY)
                             End If
                             Call PlayWaveAPI(WAVDIR & "explota.wav")
                         Else
                             Call PlayWaveAPI(WAVDIR & "tiro.wav")
                         End If
                         Command1.Enabled = True
                    Else
                         MsgBox "Ja foi disparado nesta casa do tabuleiro."
                    End If
               End If
            End If
            
    End If
    
    
ElseIf Button = vbRightButton Then 'Boton derecho
    
    If TableroHumano.PoniendoBarcos Then '¿Estamos asignado barcos?
        Call TableroHumano.BorrarBarco(MouseX, MouseY)
        lbLibres = "Barcos:" & TableroHumano.CantidadBarcos
        lbAsignados = "Atribuidos:" & TableroHumano.CantBarcosAsignados
    End If
    
End If

If TableroHumano.PoniendoBarcos Then
    If TableroHumano.CantBarcosAsignados = TableroHumano.CantidadBarcos Then
    
        If Not (TableroHumano.CantBarcosGrandesAsig >= TableroHumano.MinBarcosGrandes) _
           And Not (TableroHumano.CantBarcosMedianosAsig >= TableroHumano.MinBarcosMedianos) Then
              MsgBox "Não foram atribuidos suficientes barcos grandes, o mínimo  requerido es " & TableroHumano.MinBarcosGrandes _
              & ". Também não foram atribuidos suficientes barcos médios, o mínimo  e " & TableroHumano.MinBarcosMedianos
              
        ElseIf Not TableroHumano.CantBarcosGrandesAsig >= TableroHumano.MinBarcosGrandes Then
              MsgBox "Não foram atribuidos suficientes barcos grandes, o mínimo  requerido e " & TableroHumano.MinBarcosGrandes
              
        ElseIf Not TableroHumano.CantBarcosMedianosAsig >= TableroHumano.MinBarcosMedianos Then
              MsgBox "Não foram atribuidos suficientes barcos medianos, o mínimo  requerido e " & TableroHumano.MinBarcosMedianos
        Else
              CmdListo.Enabled = True
        End If
          
    End If
End If

End Sub

Private Sub pbTablero_MouseMove(Button As Integer, Shift As Integer, x As Single, y As Single)
Static AntMX
Static AntMY

'Posicion anterior usada para saber si cambio de casilla
AntMX = MouseX
AntMY = MouseY

MouseX = (x \ Ancho) + 1 'Obtiene la casilla en x del tablero donde esta el mouse
MouseY = (y \ Alto) + 1 'Obtiene la casilla en y del tablero donde esta el mouse

'WAV FX de movimiento
If Jugando Then
    If TableroHumano.DentroLimites(MouseX, MouseY) Then
        If AntMX <> MouseX Or AntMY <> MouseY Then Call PlayWaveAPI(WAVDIR & "mover.wav")
    End If
End If


End Sub
