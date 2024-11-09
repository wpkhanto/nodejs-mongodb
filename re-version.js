const fs = require('fs');
const semver = require('semver');

const filePath = './package.json';
const filePathLock = './package-lock.json';

if (fs.existsSync(filePath)) {
    const packageData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const packageLockData = JSON.parse(fs.readFileSync(filePathLock, 'utf-8'));

    const currentVersion = packageData.version;
    const type = ['major', 'minor', 'patch'].includes(process.argv[2])
        ? process.argv[2]
        : 'patch';

    const newVersion = semver.inc(currentVersion, type);
    if (newVersion) {
        packageData.version = newVersion;
        fs.writeFileSync(filePath, JSON.stringify(packageData, null, 2));

        packageLockData.version = newVersion;
        fs.writeFileSync(
            filePathLock,
            JSON.stringify(packageLockData, null, 2),
        );
        console.log(
            `Root Project Version updated: ${currentVersion} => ${newVersion}`,
        );
    } else {
        console.error('Error: Failed to increment version.');
    }
} else {
    console.error('Error: package.json not found.');
}
