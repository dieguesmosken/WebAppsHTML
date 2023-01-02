VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
  Persistable = 0  'NotPersistable
  DataBindingBehavior = 0  'vbNone
  DataSourceBehavior  = 0  'vbNone
  MTSTransactionMode  = 0  'NotAnMTSObject
END
Attribute VB_Name = "cTablero"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = True
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False
Option Explicit

Private Type tBarco
   Dimension As Dimensiones ' Chico, mediano o grande
   
   Orient As Orientacion 'Horizontal o Vertical
   
   Id As Byte 'Identificador del barco, necesario para chequear si
   'se ha colisionado barcos grandes.
   
   DibujarBarco As Boolean ' Flag para saber en que celda se
   'debe dibujar el barco(es esencial con los barcos medianos y
   'grandes ya que sino no se sabria en cual de las celdas deberia dibujarse)
   
   Aciertos As Byte
End Type

Private Type tCelda
   barco As tBarco
   Visitado As Boolean 'Para recordar si se ha visitado la celda
End Type


Private Const MaxX = 25 'Limites por defecto del tablero
Private Const MaxY = 25

Private Const CantBarcos = 6 'Cantidad barcos por defecto

Private Const MinGrandes = 1
Private Const MinMedianos = 1

Private fPoniendoBarcos As Boolean

Private LimiteX As Integer 'Limite sobre X del tablero
Private LimiteY As Integer 'Limite sobre Y del tablero

Private Matriz() As tCelda ' Tablero
Private MatrizIniciada As Boolean

Private Barcos As Integer 'Cantidad de barcos en juego
Private BarcosAsignados As Integer

Private BarcosHundidos As Integer
Private BarcosIntactos As Integer

Private MinimoBarcosGrandes As Integer
Private BarcosGrandesAsig As Integer

Private MinimoBarcosMedianos As Integer
Private BarcosMedianosAsig As Integer

Public Property Get CantBarcosGrandesAsig() As Integer
CantBarcosGrandesAsig = BarcosGrandesAsig
End Property

Public Property Get CantBarcosMedianosAsig() As Integer
CantBarcosMedianosAsig = BarcosMedianosAsig
End Property

Public Property Get MinBarcosGrandes() As Integer
MinBarcosGrandes = MinimoBarcosGrandes
End Property
Public Property Let MinBarcosGrandes(ByVal Min As Integer)
MinimoBarcosGrandes = Min
End Property
Public Property Get MinBarcosMedianos() As Integer
MinBarcosMedianos = MinimoBarcosMedianos
End Property
Public Property Let MinBarcosMedianos(ByVal Min As Integer)
MinimoBarcosMedianos = Min
End Property

Public Property Let PoniendoBarcos(flag As Boolean)
fPoniendoBarcos = flag
End Property

Public Property Get PoniendoBarcos() As Boolean
PoniendoBarcos = fPoniendoBarcos
End Property

'Devuelve la cantida de barcos hundidos
Public Property Get CantBarcosHundidos() As Integer
CantBarcosHundidos = BarcosHundidos
End Property
'Devuelve la cantida de barcos sin hundir
Public Property Get CantBarcosIntactos() As Integer
CantBarcosIntactos = BarcosIntactos
End Property

'Devuelve la cantida de barcos asigandos
Public Property Get CantBarcosAsignados() As Integer
CantBarcosAsignados = BarcosAsignados
End Property

'Devuelve la cantidad de barcos del tablero
Public Property Get CantidadBarcos() As Integer
CantidadBarcos = Barcos
End Property
'Establece la cantidad de barcos del tablero
Public Property Let CantidadBarcos(ByVal Num As Integer)
Barcos = Num
End Property
'Devuelve TRUE si las cordenadas X e Y chequeadas son validas, de lo contrario devuelve FALSE
Public Function DentroLimites(ByVal x As Integer, ByVal y As Integer) As Boolean
DentroLimites = x > 0 And x < LimiteX + 1 And y > 0 And y < LimiteY + 1
End Function

Public Property Get LimX() As Integer
'Devuelve el Limite sobre X del tablero
LimX = LimiteX
End Property

Public Property Get LimY() As Integer
'Devuelve el Limite sobre Y del tablero
LimY = LimiteY
End Property

Public Sub ResetTablero()
'Reinicia el tablero borrando todos los datos existentes
If MatrizIniciada Then
    Dim x As Integer
    Dim y As Integer
    For y = 1 To LimiteY
        For x = 1 To LimiteX
            Matriz(y, x).Visitado = False
            Matriz(y, x).barco.Dimension = 0
            Matriz(y, x).barco.Id = 0
            Matriz(y, x).barco.Orient = 0
            Matriz(y, x).barco.DibujarBarco = False
            Matriz(y, x).barco.Aciertos = 0
        Next
    Next
End If

BarcosAsignados = 0
BarcosHundidos = 0
BarcosIntactos = Barcos
End Sub
Public Property Get Impactos(ByVal x As Integer, ByVal y As Integer) As Integer
Impactos = Matriz(y, x).barco.Aciertos
End Property
Public Sub Dimensionar(ByVal LimiX As Integer, ByVal LimiY As Integer)
'Redimensiona el tablero de acuerdo a las especificaciones
'del usuario.

    If LimiY <= MaxY And LimiX <= MaxX Then
        ReDim Matriz(1 To LimiY, 1 To LimiX) As tCelda
        LimiteX = LimiX
        LimiteY = LimiY
        MatrizIniciada = True
    Else
        MsgBox ("O número máximo de casas no tabuleiro é " & MaxX & ". Por favor informe um valor menor.")
    End If
    
End Sub

Public Property Get HayBarco(ByVal x As Integer, ByVal y As Integer) As Boolean
'Se fija si hay algun barco en las posiciones x e y
If DentroLimites(x, y) Then
    HayBarco = Matriz(y, x).barco.Id > 0
End If
End Property

Private Sub BorrarCelda(ByVal x As Integer, ByVal y As Integer)
Matriz(y, x).barco.DibujarBarco = False
Matriz(y, x).barco.Dimension = 0
Matriz(y, x).barco.Id = 0
Matriz(y, x).barco.Orient = 0
If Not PoniendoBarcos Then Matriz(y, x).Visitado = True
End Sub

Private Sub QuitarBarcoChico(ByVal x As Integer, ByVal y As Integer)
Call BorrarCelda(x, y)
End Sub

Private Sub QuitarBarcoMediano(ByVal x As Integer, ByVal y As Integer)
Select Case Matriz(y, x).barco.Orient
    Case Horizontal
       If Matriz(y, x).barco.DibujarBarco Then
            Call BorrarCelda(x, y)
            Call BorrarCelda(x + 1, y)
       Else
            Call BorrarCelda(x, y)
            Call BorrarCelda(x - 1, y)
       End If
    Case Vertical
       If Matriz(y, x).barco.DibujarBarco Then
            Call BorrarCelda(x, y)
            Call BorrarCelda(x, y + 1)
       Else
            Call BorrarCelda(x, y)
            Call BorrarCelda(x, y - 1)
       End If
End Select

BarcosMedianosAsig = BarcosMedianosAsig - 1

End Sub

Private Sub QuitarBarcoGrande(ByVal x As Integer, ByVal y As Integer)
Select Case Matriz(y, x).barco.Orient
    Case Horizontal
       If DentroLimites(x, y) Then
           
           If Matriz(y, x).barco.DibujarBarco Then
              Call BorrarCelda(x, y)
              If DentroLimites(x + 1, y) Then Call BorrarCelda(x + 1, y)
              If DentroLimites(x + 2, y) Then Call BorrarCelda(x + 2, y)
           
           ElseIf DentroLimites(x - 1, y) Then
               
               If Matriz(y, x - 1).barco.DibujarBarco Then
                 Call BorrarCelda(x, y)
                 If DentroLimites(x - 1, y) Then Call BorrarCelda(x - 1, y)
                 If DentroLimites(x + 1, y) Then Call BorrarCelda(x + 1, y)
               
               ElseIf DentroLimites(x - 2, y) Then
                    
                    If Matriz(y, x - 2).barco.DibujarBarco Then
                      Call BorrarCelda(x, y)
                      If DentroLimites(x - 2, y) Then Call BorrarCelda(x - 2, y)
                      If DentroLimites(x - 1, y) Then Call BorrarCelda(x - 1, y)
                    End If
               End If
           End If
       End If
       
    Case Vertical
       If DentroLimites(x, y) Then
            If Matriz(y, x).barco.DibujarBarco Then
                Call BorrarCelda(x, y)
                If DentroLimites(x, y + 1) Then Call BorrarCelda(x, y + 1)
                If DentroLimites(x, y + 2) Then Call BorrarCelda(x, y + 2)
            ElseIf DentroLimites(x, y - 1) Then
                If Matriz(y - 1, x).barco.DibujarBarco Then
                  Call BorrarCelda(x, y)
                  If DentroLimites(x, y - 1) Then Call BorrarCelda(x, y - 1)
                  If DentroLimites(x, y + 1) Then Call BorrarCelda(x, y + 1)
                ElseIf DentroLimites(x, y - 2) Then
                    If Matriz(y - 2, x).barco.DibujarBarco Then
                        Call BorrarCelda(x, y)
                        If DentroLimites(x, y - 2) Then Call BorrarCelda(x, y - 2)
                        If DentroLimites(x, y - 1) Then Call BorrarCelda(x, y - 1)
                    End If
                End If
           End If
       End If
End Select

BarcosGrandesAsig = BarcosGrandesAsig - 1
End Sub

Public Function BorrarBarco(ByVal x As Integer, ByVal y As Integer) As Boolean

If DentroLimites(x, y) Then 'Coordenadas validas?
    If Matriz(y, x).barco.Id > 0 Then  ' Hay algun barco?
        
        Select Case Matriz(y, x).barco.Dimension
                Case Chico
                    Call QuitarBarcoChico(x, y)
                Case Mediano
                    Call QuitarBarcoMediano(x, y)
                Case Grande
                    Call QuitarBarcoGrande(x, y)
        End Select
        
        If fPoniendoBarcos Then
            BarcosAsignados = BarcosAsignados - 1
        Else
            BarcosHundidos = BarcosHundidos + 1
            BarcosIntactos = BarcosIntactos - 1
        End If
        
        BorrarBarco = True
    Else
        BorrarBarco = False
    End If
Else
    BorrarBarco = False
End If


End Function

Public Function PonerBarco(ByVal Id As Byte, ByVal tamaño As Byte, ByVal Orientacion As Byte, ByVal x As Integer, ByVal y As Integer) As Boolean
'Pone el barco especificado en las cordenadas indicadas
If DentroLimites(x, y) Then
    Select Case tamaño
        Case Chico
            If Not HayBarco(x, y) Then
                Matriz(y, x).barco.Dimension = tamaño
                Matriz(y, x).barco.Id = Id
                Matriz(y, x).barco.Orient = Orientacion
                BarcosAsignados = BarcosAsignados + 1
                Matriz(y, x).barco.DibujarBarco = True
                
                PonerBarco = True
            End If
        Case Mediano
                Select Case Orientacion
                       Case Horizontal
                           If Not HayBarco(x, y) And Not HayBarco(x + 1, y) Then
                                If DentroLimites(x + 1, y) Then
                                  Matriz(y, x).barco.DibujarBarco = True
                                  Matriz(y, x).barco.Dimension = tamaño
                                  Matriz(y, x).barco.Id = Id
                                  Matriz(y, x).barco.Orient = Orientacion
                                  Matriz(y, x + 1).barco.Dimension = tamaño
                                  Matriz(y, x + 1).barco.Id = Id
                                  Matriz(y, x + 1).barco.Orient = Orientacion
                                  BarcosAsignados = BarcosAsignados + 1
                                  BarcosMedianosAsig = BarcosMedianosAsig + 1
                                  PonerBarco = True
                                End If
                           End If
                       Case Vertical
                           If Not HayBarco(x, y) And Not HayBarco(x, y + 1) Then
                                If DentroLimites(x, y + 1) Then
                                    Matriz(y, x).barco.DibujarBarco = True
                                    Matriz(y, x).barco.Dimension = tamaño
                                    Matriz(y, x).barco.Id = Id
                                    Matriz(y, x).barco.Orient = Orientacion
                                    Matriz(y + 1, x).barco.Dimension = tamaño
                                    Matriz(y + 1, x).barco.Id = Id
                                    Matriz(y + 1, x).barco.Orient = Orientacion
                                    BarcosAsignados = BarcosAsignados + 1
                                    BarcosMedianosAsig = BarcosMedianosAsig + 1
                                    PonerBarco = True
                                End If
                           End If
                End Select
        Case Grande
                Select Case Orientacion
                       Case Horizontal
                           If Not HayBarco(x, y) And Not HayBarco(x + 1, y) And Not HayBarco(x + 2, y) Then
                                If DentroLimites(x + 1, y) And DentroLimites(x + 2, y) Then
                                    Matriz(y, x).barco.DibujarBarco = True
                                    Matriz(y, x).barco.Dimension = tamaño
                                    Matriz(y, x).barco.Id = Id
                                    Matriz(y, x).barco.Orient = Orientacion
                                    Matriz(y, x + 1).barco.Dimension = tamaño
                                    Matriz(y, x + 1).barco.Id = Id
                                    Matriz(y, x + 1).barco.Orient = Orientacion
                                    Matriz(y, x + 2).barco.Dimension = tamaño
                                    Matriz(y, x + 2).barco.Id = Id
                                    Matriz(y, x + 2).barco.Orient = Orientacion
                                    BarcosAsignados = BarcosAsignados + 1
                                    BarcosGrandesAsig = BarcosGrandesAsig + 1
                                    PonerBarco = True
                              End If
                           End If
                       Case Vertical
                           If Not HayBarco(x, y) And Not HayBarco(x, y + 1) And Not HayBarco(x, y + 2) Then
                                If DentroLimites(x, y + 1) And DentroLimites(x, y + 2) Then
                                    Matriz(y, x).barco.DibujarBarco = True
                                    Matriz(y, x).barco.Dimension = tamaño
                                    Matriz(y, x).barco.Id = Id
                                    Matriz(y, x).barco.Orient = Orientacion
                                    Matriz(y + 1, x).barco.Dimension = tamaño
                                    Matriz(y + 1, x).barco.Id = Id
                                    Matriz(y + 1, x).barco.Orient = Orientacion
                                    Matriz(y + 2, x).barco.Dimension = tamaño
                                    Matriz(y + 2, x).barco.Id = Id
                                    Matriz(y + 2, x).barco.Orient = Orientacion
                                    BarcosAsignados = BarcosAsignados + 1
                                    BarcosGrandesAsig = BarcosGrandesAsig + 1
                                    PonerBarco = True
                                End If
                           End If
                End Select
    End Select
End If

End Function

Public Property Get tamaño(ByVal x As Integer, ByVal y As Integer) As Dimensiones
'Devuelve el tamaño del barcos
If DentroLimites(x, y) Then
        tamaño = Matriz(y, x).barco.Dimension
End If
End Property

Public Property Get Direccion(ByVal x As Integer, ByVal y As Integer) As Orientacion
'Devlueve la direcion en del barco(Horiz o Vertical)
If DentroLimites(x, y) Then
        Direccion = Matriz(y, x).barco.Orient
End If
End Property

Public Property Get ObtenerIdBarco(ByVal x As Integer, ByVal y As Integer) As Byte
'Devuelve el numero identificador del barco en X e Y

If DentroLimites(x, y) Then
        ObtenerIdBarco = Matriz(y, x).barco.Id
End If

End Property

Private Sub Class_Initialize()
'Constructor

'-----------Inicializa variables privadas--------------
Barcos = CantBarcos 'Cantidad de barcos por defecto
BarcosIntactos = CantBarcos
BarcosHundidos = 0
MinimoBarcosGrandes = MinGrandes
MinimoBarcosMedianos = MinMedianos
BarcosGrandesAsig = 0
BarcosMedianosAsig = 0
'-----------Inicializa variables privadas--------------

Call Dimensionar(MaxX, MaxY) 'Dimensiones del tableto por defecto

Call ResetTablero ' Borra el tablero

End Sub

Public Sub DibujarCasillas(ByRef ddsSurface As DirectDrawSurface7)
'Dibuja el tablero
Dim y As Integer
Dim x As Integer
Dim DondeX As Long
Dim Dondey As Long
Dim r As RECT

For y = 1 To LimiteY
    For x = 1 To LimiteX
        '----------Resalta la casilla señalada---------
        If MouseX = x And MouseY = y Then
            Call ddsSurface.SetForeColor(vbRed)
        Else
            Call ddsSurface.SetForeColor(vbWhite)
        End If
        '----------Resalta la casilla señalada---------
        
        If Not Matriz(y, x).Visitado Then
            Call ddsSurface.SetFillColor(vbBlack)
            Call ddsSurface.DrawBox(DondeX, Dondey, DondeX + Ancho, Dondey + Alto)
        ElseIf Matriz(y, x).Visitado And Matriz(y, x).barco.Aciertos = 0 Then
            Call ddsSurface.SetFillColor(vbGreen)
            Call ddsSurface.DrawBox(DondeX, Dondey, DondeX + Ancho, Dondey + Alto)
        ElseIf Matriz(y, x).barco.Aciertos > 0 Then
            Call ddsSurface.SetFillColor(vbRed)
            Call ddsSurface.DrawBox(DondeX, Dondey, DondeX + Ancho, Dondey + Alto)
        End If
        
        DondeX = DondeX + Ancho
    Next
    DondeX = 0
    Dondey = Dondey + Alto
Next

End Sub

Public Sub DibujarBarcos(ByRef ddsSurface As DirectDrawSurface7)
'Dibuja los barcos del tablero
Dim y As Integer
Dim x As Integer
Dim DondeX As Long
Dim Dondey As Long
Dim r As RECT

For y = 1 To LimiteY
    For x = 1 To LimiteX
 
        If HayBarco(x, y) And Matriz(y, x).barco.DibujarBarco Then
             Select Case Matriz(y, x).barco.Dimension
                Case Chico
                    Select Case Matriz(y, x).barco.Orient
                    
                        Case Horizontal
                            ddsSurface.BltFast DondeX, Dondey, ddsBarcoChico(Horizontal), r, DDBLTFAST_SRCCOLORKEY
                        Case Vertical
                            ddsSurface.BltFast DondeX, Dondey, ddsBarcoChico(Vertical), r, DDBLTFAST_SRCCOLORKEY
                    End Select
                Case Mediano
                    Select Case Matriz(y, x).barco.Orient
                    
                        Case Horizontal
                            ddsSurface.BltFast DondeX, Dondey, ddsBarcoMediano(Horizontal), r, DDBLTFAST_SRCCOLORKEY
                        Case Vertical
                            ddsSurface.BltFast DondeX, Dondey, ddsBarcoMediano(Vertical), r, DDBLTFAST_SRCCOLORKEY
                    End Select
                Case Grande
                    Select Case Matriz(y, x).barco.Orient
                    
                        Case Horizontal
                            ddsSurface.BltFast DondeX, Dondey, ddsBarcoGrande(Horizontal), r, DDBLTFAST_SRCCOLORKEY
                        Case Vertical
                            ddsSurface.BltFast DondeX, Dondey, ddsBarcoGrande(Vertical), r, DDBLTFAST_SRCCOLORKEY
                    
                    End Select
                    
             End Select
                            
        End If
        DondeX = DondeX + Ancho
    Next
    DondeX = 0
    Dondey = Dondey + Alto
Next
        
End Sub

Public Sub ComputadoraPoneBarcosAlAzar()
Dim i As Integer, j As Integer
Dim tamaño As Dimensiones
Dim direc As Orientacion
Dim x As Byte
Dim y As Byte


    For j = 1 To MinimoBarcosGrandes
        
        Do
            
            tamaño = Grande
            direc = NumeroAlAzar(1, 2)
            x = NumeroAlAzar(1, LimiteX)
            y = NumeroAlAzar(1, LimiteY)
            
        Loop While Not PonerBarco(j, tamaño, direc, x, y)
        
    Next j
    
    For i = 1 To MinimoBarcosMedianos
        Do
            tamaño = Mediano
            direc = NumeroAlAzar(1, 2)
            x = NumeroAlAzar(1, LimiteX)
            y = NumeroAlAzar(1, LimiteY)
        Loop While Not PonerBarco(BarcosAsignados + i, tamaño, direc, x, y)
        
    Next
    
    For i = 1 To Barcos - BarcosAsignados
        
        Do
            tamaño = Chico
            direc = NumeroAlAzar(1, 2)
            x = NumeroAlAzar(1, LimiteX)
            y = NumeroAlAzar(1, LimiteY)
        Loop While Not PonerBarco(BarcosAsignados + i, tamaño, direc, x, y)
        
    
    Next i

End Sub
Private Sub ActualizarImpacto(ByVal x As Integer, ByVal y As Integer)

Matriz(y, x).barco.Aciertos = Matriz(y, x).barco.Aciertos + 1

If Matriz(y, x).barco.Dimension <> Chico Then 'Actualizamos los demas casilleros

Select Case Matriz(y, x).barco.Dimension
    Case Mediano
        Select Case Matriz(y, x).barco.Orient
             Case Horizontal
                 If DentroLimites(x + 1, y) Then
                    If (Matriz(y, x + 1).barco.Id > 0) _
                    And (Matriz(y, x).barco.Id = Matriz(y, x + 1).barco.Id) Then Matriz(y, x + 1).barco.Aciertos = Matriz(y, x + 1).barco.Aciertos + 1
                 End If
                 If DentroLimites(x - 1, y) Then
                    If (Matriz(y, x - 1).barco.Id > 0) And _
                    (Matriz(y, x).barco.Id = Matriz(y, x - 1).barco.Id) Then Matriz(y, x - 1).barco.Aciertos = Matriz(y, x - 1).barco.Aciertos + 1
                 End If
                 
             Case Vertical
                 If DentroLimites(x, y - 1) Then
                    If (Matriz(y - 1, x).barco.Id > 0) And _
                    (Matriz(y, x).barco.Id = Matriz(y - 1, x).barco.Id) Then Matriz(y - 1, x).barco.Aciertos = Matriz(y - 1, x).barco.Aciertos + 1
                 End If
                 If DentroLimites(x, y + 1) Then
                    If (Matriz(y + 1, x).barco.Id > 0) And _
                    (Matriz(y, x).barco.Id = Matriz(y + 1, x).barco.Id) Then Matriz(y + 1, x).barco.Aciertos = Matriz(y + 1, x).barco.Aciertos + 1
                 End If
        End Select
    Case Grande
        Select Case Matriz(y, x).barco.Orient
             Case Horizontal
                 If DentroLimites(x + 1, y) Then
                    If (Matriz(y, x + 1).barco.Id > 0) And _
                    (Matriz(y, x).barco.Id = Matriz(y, x + 1).barco.Id) Then Matriz(y, x + 1).barco.Aciertos = Matriz(y, x + 1).barco.Aciertos + 1
                 End If
                 If DentroLimites(x - 1, y) Then
                    If (Matriz(y, x - 1).barco.Id > 0) And _
                    (Matriz(y, x).barco.Id = Matriz(y, x - 1).barco.Id) Then Matriz(y, x - 1).barco.Aciertos = Matriz(y, x - 1).barco.Aciertos + 1
                 End If
                 If DentroLimites(x + 2, y) Then
                    If (Matriz(y, x + 2).barco.Id > 0) And _
                    (Matriz(y, x).barco.Id = Matriz(y, x + 2).barco.Id) Then Matriz(y, x + 2).barco.Aciertos = Matriz(y, x + 2).barco.Aciertos + 1
                 End If
                 If DentroLimites(x - 2, y) Then
                    If (Matriz(y, x - 2).barco.Id > 0) And _
                    (Matriz(y, x).barco.Id = Matriz(y, x - 2).barco.Id) Then Matriz(y, x - 2).barco.Aciertos = Matriz(y, x - 2).barco.Aciertos + 1
                 End If
              Case Vertical
                 If DentroLimites(x, y + 1) Then
                    If (Matriz(y + 1, x).barco.Id > 0) And _
                    (Matriz(y, x).barco.Id = Matriz(y + 1, x).barco.Id) Then Matriz(y + 1, x).barco.Aciertos = Matriz(y + 1, x).barco.Aciertos + 1
                 End If
                 If DentroLimites(x, y - 1) Then
                    If (Matriz(y - 1, x).barco.Id > 0) And _
                    (Matriz(y, x).barco.Id = Matriz(y - 1, x).barco.Id) Then Matriz(y - 1, x).barco.Aciertos = Matriz(y - 1, x).barco.Aciertos + 1
                 End If
                 If DentroLimites(x, y + 2) Then
                    If (Matriz(y + 2, x).barco.Id > 0) And _
                    (Matriz(y, x).barco.Id = Matriz(y + 2, x).barco.Id) Then Matriz(y + 2, x).barco.Aciertos = Matriz(y + 2, x).barco.Aciertos + 1
                 End If
                 If DentroLimites(x, y - 2) Then
                    If (Matriz(y - 2, x).barco.Id > 0) And _
                    (Matriz(y, x).barco.Id = Matriz(y - 2, x).barco.Id) Then Matriz(y - 2, x).barco.Aciertos = Matriz(y - 2, x).barco.Aciertos + 1
                 End If
        End Select
         
    End Select
End If
     
End Sub

Public Function DisparoAcertado(ByVal x As Integer, ByVal y As Integer) As Boolean
If DentroLimites(x, y) Then
    Matriz(y, x).Visitado = True
    If (Matriz(y, x).barco.Id > 0) Then
        Call ActualizarImpacto(x, y)
        DisparoAcertado = True
    Else
        DisparoAcertado = False
    End If
    
Else
    DisparoAcertado = False
End If
End Function

Public Function NumeroAlAzar(ByVal Menor As Integer, ByVal Mayor As Integer)
Randomize Timer
NumeroAlAzar = Rnd * Mayor
If NumeroAlAzar > Mayor Then
    NumeroAlAzar = Mayor
ElseIf NumeroAlAzar < Menor Then
    NumeroAlAzar = Menor
End If
End Function

Public Property Get Visitado(ByVal x As Integer, ByVal y As Integer)
If DentroLimites(x, y) Then
    Visitado = Matriz(y, x).Visitado
End If
End Property
