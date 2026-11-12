Add-Type -AssemblyName System.Drawing

$logo = [System.Drawing.Bitmap]::FromFile("c:\Users\USER\Desktop\Fish & Flora Hub\images\logo.png")
$canvas = New-Object System.Drawing.Bitmap(700, 250)
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Fill with Dark Header background (#0A1C30)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#0A1C30"))
$g.FillRectangle($brush, 0, 0, 700, 250)
$brush.Dispose()

# Draw the logo
$scale = 180.0 / $logo.Height
$drawW = [int]($logo.Width * $scale)
$drawH = 180
$drawX = 40
$drawY = 35

$g.DrawImage($logo, $drawX, $drawY, $drawW, $drawH)
$g.Dispose()
$logo.Dispose()

$canvas.Save("c:\Users\USER\Desktop\Fish & Flora Hub\test_dark_preview.png", [System.Drawing.Imaging.ImageFormat]::Png)
$canvas.Dispose()

Write-Host "Dark preview saved!"
