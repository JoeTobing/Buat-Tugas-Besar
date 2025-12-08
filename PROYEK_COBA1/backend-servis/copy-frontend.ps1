# Script untuk Copy Frontend React ke Laravel Resources
# Jalankan dari folder backend-servis

Write-Host "Copying frontend files to Laravel resources..." -ForegroundColor Green

# Buat folder jika belum ada
$folders = @(
    "resources\js\components",
    "resources\js\pages",
    "resources\js\contexts",
    "resources\js\services",
    "resources\js\utils"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "Created folder: $folder" -ForegroundColor Yellow
    }
}

# Copy files
Write-Host "`nCopying components..." -ForegroundColor Cyan
Copy-Item -Path "..\frontend-web\src\components\*" -Destination "resources\js\components\" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Copying pages..." -ForegroundColor Cyan
Copy-Item -Path "..\frontend-web\src\pages\*" -Destination "resources\js\pages\" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Copying contexts..." -ForegroundColor Cyan
Copy-Item -Path "..\frontend-web\src\contexts\*" -Destination "resources\js\contexts\" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Copying services..." -ForegroundColor Cyan
Copy-Item -Path "..\frontend-web\src\services\*" -Destination "resources\js\services\" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Copying utils..." -ForegroundColor Cyan
Copy-Item -Path "..\frontend-web\src\utils\*" -Destination "resources\js\utils\" -Recurse -Force -ErrorAction SilentlyContinue

# Update API base URL di api.js
Write-Host "`nUpdating API base URL..." -ForegroundColor Cyan
$apiFile = "resources\js\services\api.js"
if (Test-Path $apiFile) {
    $content = Get-Content $apiFile -Raw
    $content = $content -replace "const API_BASE_URL = import\.meta\.env\.VITE_API_URL \|\| 'http://localhost:8000/api'", "const API_BASE_URL = '/api'"
    Set-Content -Path $apiFile -Value $content
    Write-Host "Updated API base URL to '/api'" -ForegroundColor Green
}

# Merge CSS
Write-Host "`nMerging CSS..." -ForegroundColor Cyan
$frontendCss = "..\frontend-web\src\index.css"
$laravelCss = "resources\css\app.css"
if (Test-Path $frontendCss) {
    $cssContent = Get-Content $frontendCss -Raw
    $existingCss = if (Test-Path $laravelCss) { Get-Content $laravelCss -Raw } else { "" }
    $mergedCss = $existingCss + "`n`n" + $cssContent
    Set-Content -Path $laravelCss -Value $mergedCss
    Write-Host "Merged CSS files" -ForegroundColor Green
}

Write-Host "`n✅ Copy completed!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Install dependencies: npm install" -ForegroundColor White
Write-Host "2. Run dev server: npm run dev" -ForegroundColor White
Write-Host "3. Start Laravel: php artisan serve" -ForegroundColor White



# Jalankan dari folder backend-servis

Write-Host "Copying frontend files to Laravel resources..." -ForegroundColor Green

# Buat folder jika belum ada
$folders = @(
    "resources\js\components",
    "resources\js\pages",
    "resources\js\contexts",
    "resources\js\services",
    "resources\js\utils"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "Created folder: $folder" -ForegroundColor Yellow
    }
}

# Copy files
Write-Host "`nCopying components..." -ForegroundColor Cyan
Copy-Item -Path "..\frontend-web\src\components\*" -Destination "resources\js\components\" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Copying pages..." -ForegroundColor Cyan
Copy-Item -Path "..\frontend-web\src\pages\*" -Destination "resources\js\pages\" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Copying contexts..." -ForegroundColor Cyan
Copy-Item -Path "..\frontend-web\src\contexts\*" -Destination "resources\js\contexts\" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Copying services..." -ForegroundColor Cyan
Copy-Item -Path "..\frontend-web\src\services\*" -Destination "resources\js\services\" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Copying utils..." -ForegroundColor Cyan
Copy-Item -Path "..\frontend-web\src\utils\*" -Destination "resources\js\utils\" -Recurse -Force -ErrorAction SilentlyContinue

# Update API base URL di api.js
Write-Host "`nUpdating API base URL..." -ForegroundColor Cyan
$apiFile = "resources\js\services\api.js"
if (Test-Path $apiFile) {
    $content = Get-Content $apiFile -Raw
    $content = $content -replace "const API_BASE_URL = import\.meta\.env\.VITE_API_URL \|\| 'http://localhost:8000/api'", "const API_BASE_URL = '/api'"
    Set-Content -Path $apiFile -Value $content
    Write-Host "Updated API base URL to '/api'" -ForegroundColor Green
}

# Merge CSS
Write-Host "`nMerging CSS..." -ForegroundColor Cyan
$frontendCss = "..\frontend-web\src\index.css"
$laravelCss = "resources\css\app.css"
if (Test-Path $frontendCss) {
    $cssContent = Get-Content $frontendCss -Raw
    $existingCss = if (Test-Path $laravelCss) { Get-Content $laravelCss -Raw } else { "" }
    $mergedCss = $existingCss + "`n`n" + $cssContent
    Set-Content -Path $laravelCss -Value $mergedCss
    Write-Host "Merged CSS files" -ForegroundColor Green
}

Write-Host "`n✅ Copy completed!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Install dependencies: npm install" -ForegroundColor White
Write-Host "2. Run dev server: npm run dev" -ForegroundColor White
Write-Host "3. Start Laravel: php artisan serve" -ForegroundColor White







