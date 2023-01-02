VERSION 5.00
Begin VB.Form frmAcerca 
   BorderStyle     =   3  'Fixed Dialog
   Caption         =   "Acerca de"
   ClientHeight    =   2085
   ClientLeft      =   45
   ClientTop       =   330
   ClientWidth     =   4575
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   ScaleHeight     =   2085
   ScaleWidth      =   4575
   ShowInTaskbar   =   0   'False
   StartUpPosition =   1  'CenterOwner
   Begin VB.Label Label6 
      AutoSize        =   -1  'True
      Caption         =   "pablomarquez@noland-studios.com.ar"
      BeginProperty Font 
         Name            =   "Tahoma"
         Size            =   8.25
         Charset         =   0
         Weight          =   700
         Underline       =   -1  'True
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H000000FF&
      Height          =   195
      Left            =   720
      TabIndex        =   3
      Top             =   1560
      Width           =   3255
   End
   Begin VB.Label Label3 
      AutoSize        =   -1  'True
      Caption         =   "Márquez Pablo Ignacio"
      BeginProperty Font 
         Name            =   "Tahoma"
         Size            =   8.25
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   195
      Left            =   1312
      TabIndex        =   2
      Top             =   1215
      Width           =   1920
   End
   Begin VB.Label Label2 
      AutoSize        =   -1  'True
      Caption         =   "Programado por"
      BeginProperty Font 
         Name            =   "Tahoma"
         Size            =   8.25
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   195
      Left            =   1582
      TabIndex        =   1
      Top             =   705
      Width           =   1380
   End
   Begin VB.Label Label1 
      AutoSize        =   -1  'True
      Caption         =   "Batalla naval"
      BeginProperty Font 
         Name            =   "Tahoma"
         Size            =   8.25
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   195
      Left            =   1725
      TabIndex        =   0
      Top             =   195
      Width           =   1095
   End
End
Attribute VB_Name = "frmAcerca"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub Label6_Click()
Call EnviarMail(Label6.Caption)
End Sub
