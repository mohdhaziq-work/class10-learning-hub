plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.class10hub.app"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.class10hub.app"
        minSdk = 24
        targetSdk = 34
        versionCode = 4
        versionName = "2.0.2"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("androidx.activity:activity-ktx:1.8.2")
    /* TWA support: androidx.browser provides the Trusted Web Activity plumbing
       (Custom Tabs renderer, verified-origin handshake). Not used by the plain
       WebView build path — safe to ship now, needed for the TWA variant. */
    implementation("androidx.browser:browser:1.8.0")
}
