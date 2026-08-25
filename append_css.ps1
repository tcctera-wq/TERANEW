$cssPath = "$PSScriptRoot\output.css"

$existing = Get-Content $cssPath -Raw

# Remove the balanced custom logo filter for dark mode
$existing = $existing -replace '(?s)\/\* Balanced Custom Logo Filter for Dark Mode \*\/.*?\}', ''

$appendContent = @"

/* Advanced Custom Logo Filter for Exact Hex #0d6fb5 */
:is(.dark .dark-logo) {
    /* Using SVG ColorMatrix to force exact hex values on PNG */
    filter: url(#logo-dark-filter) !important;
}

"@

$existing += $appendContent
Set-Content -Path $cssPath -Value $existing
