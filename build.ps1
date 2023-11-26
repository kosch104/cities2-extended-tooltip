param ($pluginName, $pluginVersion, $projectPath, $pluginPath, $bepInExVersion)

Write-Host "Project name: $pluginName"
Write-Host "Project version: $pluginVersion"
Write-Host "Project path: $projectPath"
Write-Host "Plugin path: $pluginPath"
Write-Host "BepInEx version: $bepInExVersion"

# Copy required thunderstore files
Copy-Item -Path $projectPath\manifest.json -Destination $pluginPath -Recurse -Force
Copy-Item -Path $projectPath\icon.png -Destination $pluginPath -Recurse -Force
Copy-Item -Path $projectPath\README.md -Destination $pluginPath -Recurse -Force

# Compress the contents of the folder
try {
	$languages = Get-ChildItem -Path "$projectPath\languages"
    Compress-Archive -Path $languages.FullName -DestinationPath "$pluginPath\language_pack" -Force
    Write-Host "Language pack successfully created at $pluginPath"
} catch {
    Write-Host "Error: $_"
    exit 1
}

# Create language pack file
if (Test-Path "$pluginPath\language_pack.data" -PathType Leaf) {
	Remove-Item -Path "$pluginPath\language_pack.data" -Force
}
Rename-Item -Path "$pluginPath\language_pack.zip" -NewName "$pluginPath\language_pack.data"

try {
	$files = Get-ChildItem -Path $pluginPath
	Compress-Archive -Path $files.FullName -DestinationPath "$pluginPath\..\$pluginName-BepInEx$bepInExVersion-v$pluginVersion.zip" -Force
	Write-Host "$pluginName for BepInEx$bepInExVersion successfully packed to $pluginPath"
} catch {
	Write-Host "Error: $_"
	exit 1
}