VERSION 5.00
Begin VB.Form FrmConfig 
   BorderStyle     =   3  'Fixed Dialog
   Caption         =   "Configuração"
   ClientHeight    =   2940
   ClientLeft      =   45
   ClientTop       =   330
   ClientWidth     =   5610
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   ScaleHeight     =   2940
   ScaleWidth      =   5610
   ShowInTaskbar   =   0   'False
   StartUpPosition =   1  'CenterOwner
   Begin VB.CheckBox FlagTrampa 
      Caption         =   "Trampa"
      Height          =   255
      Left            =   840
      TabIndex        =   16
      Top             =   2040
      Width           =   975
   End
   Begin VB.Frame Frame2 
      Caption         =   "Barcos"
      Height          =   2775
      Left            =   2640
      TabIndex        =   8
      Top             =   0
      Width           =   2895
      Begin VB.CommandButton CmdAplicarBarcos 
         Caption         =   "Aplicar"
         Height          =   330
         Left            =   360
         TabIndex        =   15
         Top             =   2280
         Width           =   2175
      End
      Begin VB.TextBox txtBarcosMedianos 
         Height          =   375
         Left            =   1920
         TabIndex        =   14
         Top             =   1440
         Width           =   735
      End
      Begin VB.TextBox TxtMinBarcosGrandes 
         Height          =   375
         Left            =   1920
         TabIndex        =   12
         Top             =   840
         Width           =   735
      End
      Begin VB.TextBox txtNroBarcos 
         Height          =   375
         Left            =   1920
         TabIndex        =   10
         Top             =   240
         Width           =   735
      End
      Begin VB.Label Label6 
         AutoSize        =   -1  'True
         Caption         =   "Minimo barcos médios"
         Height          =   195
         Left            =   120
         TabIndex        =   13
         Top             =   1560
         Width           =   1560
      End
      Begin VB.Label Label5 
         AutoSize        =   -1  'True
         Caption         =   "Minimo barcos grandes:"
         Height          =   195
         Left            =   120
         TabIndex        =   11
         Top             =   960
         Width           =   1680
      End
      Begin VB.Label Label4 
         AutoSize        =   -1  'True
         Caption         =   "Numero de barcos:"
         Height          =   195
         Left            =   120
         TabIndex        =   9
         Top             =   360
         Width           =   1350
      End
   End
   Begin VB.Frame Frame1 
      Caption         =   "Tabela"
      Height          =   1935
      Left            =   75
      TabIndex        =   1
      Top             =   0
      Width           =   2475
      Begin VB.CommandButton CdmAplicar 
         Caption         =   "Aplicar"
         Height          =   330
         Left            =   135
         TabIndex        =   7
         Top             =   1320
         Width           =   2175
      End
      Begin VB.TextBox txtY 
         Height          =   360
         Left            =   1485
         TabIndex        =   5
         Text            =   "Text1"
         Top             =   675
         Width           =   615
      End
      Begin VB.TextBox txtX 
         Height          =   360
         Left            =   480
         TabIndex        =   3
         Text            =   "Text1"
         Top             =   690
         Width           =   615
      End
      Begin VB.Label Label3 
         AutoSize        =   -1  'True
         Caption         =   "X"
         Height          =   195
         Left            =   1245
         TabIndex        =   6
         Top             =   750
         Width           =   105
      End
      Begin VB.Label Label2 
         AutoSize        =   -1  'True
         Caption         =   "X"
         Height          =   195
         Left            =   240
         TabIndex        =   4
         Top             =   765
         Width           =   105
      End
      Begin VB.Label Label1 
         Caption         =   "Dimensão do tabuleiro"
         Height          =   255
         Left            =   150
         TabIndex        =   2
         Top             =   270
         Width           =   1725
      End
   End
   Begin VB.CommandButton Command2 
      Caption         =   "OK"
      Default         =   -1  'True
      Height          =   330
      Left            =   120
      TabIndex        =   0
      Top             =   2400
      Width           =   2460
   End
End
Attribute VB_Name = "FrmConfig"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False


Private Sub CdmAplicar_Click()

Call TableroHumano.Dimensionar(Val(txtX.Text), Val(txtY.Text))
Call TableroComputadora.Dimensionar(Val(txtX.Text), Val(txtY.Text))

End Sub

Private Sub CmdAplicarBarcos_Click()
On Error Resume Next
TableroHumano.CantidadBarcos = CInt(Val(txtNroBarcos.Text))
TableroComputadora.CantidadBarcos = CInt(Val(txtNroBarcos.Text))
TableroHumano.MinBarcosGrandes = CInt(Val(TxtMinBarcosGrandes.Text))
TableroComputadora.MinBarcosGrandes = CInt(Val(TxtMinBarcosGrandes.Text))
TableroHumano.MinBarcosMedianos = CInt(Val(txtBarcosMedianos.Text))
TableroComputadora.MinBarcosMedianos = CInt(Val(txtBarcosMedianos.Text))
End Sub

Private Sub Command2_Click()

Me.Visible = False

End Sub

Private Sub Form_Load()

txtX.Text = TableroHumano.LimX
txtY.Text = TableroHumano.LimY

txtNroBarcos.Text = TableroHumano.CantidadBarcos
TxtMinBarcosGrandes.Text = TableroHumano.MinBarcosGrandes
txtBarcosMedianos.Text = TableroHumano.MinBarcosGrandes


End Sub

