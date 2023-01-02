Attribute VB_Name = "Graficos"
Option Explicit

Public ddsBarcoChico(1 To MAXDIRECCIONES) As DirectDrawSurface7
Public ddsBarcoMediano(1 To MAXDIRECCIONES) As DirectDrawSurface7
Public ddsBarcoGrande(1 To MAXDIRECCIONES) As DirectDrawSurface7


Public Sub CrearSurfaces(ByRef ddsMain As DirectDrawSurface7, ByRef ddsBackBuffer As DirectDrawSurface7, ByVal lTableroX As Long, ByVal lTableroY As Long, ByVal DD As DirectDraw7)
On Error GoTo ErrorHandler

Dim ddsd As DDSURFACEDESC2

'%%%%%%%%%%%%Crea el surface principal%%%%%%%%%%%%%%%%%%%%%

     ddsd.lFlags = DDSD_CAPS
     ddsd.ddsCaps.lCaps = DDSCAPS_PRIMARYSURFACE
     Set ddsMain = DD.CreateSurface(ddsd)
     
'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

'%%%%%%%%%%%%%%Crea el BackBuffer en Memoria!%%%%%%%%%%%%%%%%%
     
     ddsd.lFlags = DDSD_CAPS Or DDSD_HEIGHT Or DDSD_WIDTH
     ddsd.ddsCaps.lCaps = DDSCAPS_OFFSCREENPLAIN Or DDSCAPS_SYSTEMMEMORY
     'tamaño del backbuffer
     ddsd.lHeight = lTableroY
     ddsd.lWidth = lTableroX
     
     Set ddsBackBuffer = DD.CreateSurface(ddsd)

'%%%%%%%%%%%%%%%%%%%%%%%%%%


Exit Sub


ErrorHandler:
    MsgBox ("Error al crear los surface.")
    
End Sub
     

Public Sub CrearClipper(ByRef DDC As DirectDrawClipper, ByRef ddsSurface As DirectDrawSurface7, ByVal hWnd As Long, ByVal DD As DirectDraw7)
Set DDC = DD.CreateClipper(0)
Call DDC.SetHWnd(hWnd)
'Asignamos el CLIPPER al SURFACE
Call ddsSurface.SetClipper(DDC)
End Sub

Public Sub CargarSurfaceDesdeArchivo(ByVal DirectDraW As DirectDraw7, ByRef ddsSurface As DirectDrawSurface7, ByVal Archivo As String, Optional ByVal ColorKey As Boolean = True, Optional ByVal Color = vbBlack)

Dim ddsd As DDSURFACEDESC2
Dim ddck As DDCOLORKEY

With ddsd
   .lFlags = DDSD_CAPS
   .ddsCaps.lCaps = DDSCAPS_OFFSCREENPLAIN Or DDSCAPS_SYSTEMMEMORY
End With
        
Set ddsSurface = DirectDraW.CreateSurfaceFromFile(Archivo, ddsd)

If ColorKey Then
    ddck.low = Color
    ddck.high = Color
    Call ddsSurface.SetColorKey(DDCKEY_SRCBLT, ddck)
End If

End Sub



Public Sub DrawText(ByRef Surface As DirectDrawSurface7, ByVal lngXPos As Integer, ByVal lngYPos As Integer, ByVal strText As String, ByVal lngColor As Long)
   If strText <> "" Then
    Surface.SetFontTransparency True
    Surface.SetForeColor vbBlack
    Surface.SetFont FrmMain.Font
    Surface.DrawText lngXPos - 2, lngYPos - 1, strText, False

    
    Surface.SetFontTransparency True
    Surface.SetForeColor lngColor
    Surface.SetFont FrmMain.Font
    Surface.DrawText lngXPos, lngYPos, strText, False
   End If
End Sub
