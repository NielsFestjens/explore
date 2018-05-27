npm install
npm run build

Remove-Item 'package' -Force -Recurse
New-Item 'package' -ItemType directory
Copy-Item -Path 'index.html' -Destination 'package\index.html'
Copy-Item -Path 'Web.config' -Destination 'package\Web.config'
Copy-Item -Path 'js' -Destination 'package/js' -Recurse
Copy-Item -Path 'css' -Destination 'package/css' -Recurse
Copy-Item -Path 'models' -Destination 'package/models' -Recurse

Remove-Item 'package.zip' -Force
Compress-Archive -Path 'package\*' -DestinationPath 'package.zip'