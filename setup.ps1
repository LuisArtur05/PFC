$envFilePath = ".env"

if (Test-Path $envFilePath) {
    Get-Content $envFilePath | ForEach-Object {
        if ($_ -match "^\s*([^#][\w_]+)\s*=\s*(.+)$") {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
}


Start-Process -NoNewWindow -FilePath "mvn" -ArgumentList "-f NeveraApi/pom.xml spring-boot:run" -WorkingDirectory "."


Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "start" -WorkingDirectory ".\frontend-react"
