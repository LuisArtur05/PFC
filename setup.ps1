Write-Host "Iniciando backend Spring Boot..."
Start-Process -NoNewWindow -FilePath "mvn" -ArgumentList "-f NeveraApi/pom.xml spring-boot:run"

Start-Sleep -Seconds 10

Write-Host "Iniciando frontend React..."
Set-Location -Path "frontend-react"
npm start
