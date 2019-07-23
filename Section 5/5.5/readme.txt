There is no code sample for video 5.5, as it consists of a series of commands executed from PowerShell to complete the section. The files generated in the video are not included as they are generated uniquely per computer and contain information specific to it.


The commands executed were as follows:

1. Release build
execute:
npm run release


2. Change directory to the output path of the release build.

example: 
cd G:\packt\projects\section5_cordova\platforms\android\app\build\outputs\apk\release


3. Generate a keystore using keytool

The format is as follows:
.$Env:JAVA_HOME/bin/keytool -genkey -v -keystore <keystoreName>.keystore -alias <Keystore AliasName> -keyalg <Key algorithm> -keysize <Key size> -validity <Key Validity in Days>

example:
.$Env:JAVA_HOME/bin/keytool -genkey -v -keystore my.mobileapps.keystore -alias myMobileapps -keyalg RSA -keysize 2048 -validity 10000


4. JAR Signer

The format is as follows:
.$Env:JAVA_HOME/bin/jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore <keystorename> <Unsigned APK file> <Keystore Alias name>

example:
.$Env:JAVA_HOME/bin/jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my.mobileapps.keystore app-release-unsigned.apk myMobileapps


5. ZipAlign
optimizes APK for Android (reduction in RAM required to run)

The format is as follows:
C:\Users\<UserName>\AppData\Local\Android\Sdk\build-tools\<Version>\zipalign -v 4 app-release-unsigned.apk phonebook.apk

example:
C:\Users\Travis\AppData\Local\Android\Sdk\build-tools\28.0.3\zipalign -v 4 app-release-unsigned.apk phonebook.apk