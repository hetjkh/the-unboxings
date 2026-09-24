param([string]$Source = 'C:\Users\Admin\Downloads\The_Unboxing_Luxury_Experience_Catalogue_2026.pptx')
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$destination = Join-Path $PSScriptRoot '../artifacts/luxury-source'
[System.IO.Directory]::CreateDirectory($destination) | Out-Null
$deck = [System.IO.Compression.ZipFile]::OpenRead($Source)
function Read-Entry($name) {
  $reader = [System.IO.StreamReader]::new($deck.GetEntry($name).Open())
  try { return $reader.ReadToEnd() } finally { $reader.Dispose() }
}
try {
  $slides = @()
  foreach ($entry in ($deck.Entries | Where-Object { $_.FullName -match '^ppt/slides/slide\d+\.xml$' } | Sort-Object { [int]([regex]::Match($_.Name,'\d+').Value) })) {
    [xml]$xml = Read-Entry $entry.FullName
    [xml]$rels = Read-Entry ('ppt/slides/_rels/' + $entry.Name + '.rels')
    $images = @()
    foreach ($pic in $xml.SelectNodes('//*[local-name()="pic"]')) {
      $blip = $pic.SelectSingleNode('.//*[local-name()="blip"]')
      if (-not $blip) { continue }
      $rid = $blip.GetAttribute('embed','http://schemas.openxmlformats.org/officeDocument/2006/relationships')
      $rel = $rels.Relationships.Relationship | Where-Object { $_.Id -eq $rid }
      if (-not $rel -or $rel.TargetMode -eq 'External') { continue }
      $name = [System.IO.Path]::GetFileName($rel.Target)
      $media = $deck.GetEntry('ppt/media/' + $name)
      if ($media) { [System.IO.Compression.ZipFileExtensions]::ExtractToFile($media, (Join-Path $destination $name), $true) }
      $size = $pic.SelectSingleNode('.//*[local-name()="xfrm"]/*[local-name()="ext"]')
      $images += @{ file=$name; width=$size.cx; height=$size.cy }
    }
    $slides += @{ number=[int]([regex]::Match($entry.Name,'\d+').Value); text=@($xml.SelectNodes('//*[local-name()="t"]') | ForEach-Object { $_.InnerText }); images=$images }
  }
  $slides | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath (Join-Path $destination 'slides.json') -Encoding UTF8
  Write-Output "Extracted $($slides.Count) slides to $destination"
} finally { $deck.Dispose() }
