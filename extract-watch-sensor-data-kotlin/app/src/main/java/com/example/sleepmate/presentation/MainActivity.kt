package com.example.sleepmate.presentation

import android.Manifest
import android.content.ContentValues.TAG
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.wear.compose.material.Button
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Text
import com.example.sleepmate.complication.MyForegroundService
import com.example.sleepmate.complication.UdpClient
import com.example.sleepmate.presentation.theme.SleepmateTheme
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

private var isServiceRunning = false
class MainActivity : ComponentActivity() {

    private val udpClient: UdpClient by lazy {
        UdpClient(this,"192.168.119.200", 9894)
    }

    private val permissions = arrayOf(
        Manifest.permission.BODY_SENSORS,
        Manifest.permission.BODY_SENSORS_BACKGROUND,
        Manifest.permission.FOREGROUND_SERVICE
    )
    private val requestCode = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ActivityCompat.requestPermissions(this, permissions, requestCode)

            WearApp("Android", context = this, udpClient = udpClient)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
    }
}

fun startForegroundService(context: Context) {
    val serviceIntent = Intent(context, MyForegroundService::class.java)
    ContextCompat.startForegroundService(context, serviceIntent)
}

fun endForegroundService(context: Context) {
    val serviceIntent = Intent(context, MyForegroundService::class.java)
    context.stopService(serviceIntent)
}

@Composable
fun WearApp(greetingName: String, context: Context, udpClient: UdpClient) {
    SleepmateTheme {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colors.background),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            startSendingData(context)
            endSendingData(context)
        }
    }
}

@Composable
fun SendUdpDataButton(udpClient: UdpClient) {
    Button(
        onClick = {
            Log.d(TAG, "Button Clicked")
            val dataToSend = "연결 확인 중입니다."
            CoroutineScope(Dispatchers.IO).launch {
                try {
                    udpClient.sendData(dataToSend)
                    Log.d("MyApp", "Data sent successfully")
                } catch (e: Exception) {
                    Log.e("MyApp", "Error sending data: ${e.message}", e)
                }
            }
        },
        modifier = Modifier.padding(16.dp)
    ) {
        Text("UDP 데이터 전송")
    }
}

@Composable
fun startSendingData(context: Context) {
    Button(
        onClick = {
            Log.d(TAG, "Start Sending Data")
            isServiceRunning = true
            startForegroundService(context)
        },
        modifier = Modifier.padding(16.dp)
    ) {
        Text("전송 시작")
    }
}

@Composable
fun endSendingData(context: Context) {
    Button(
        onClick = {
            Log.d(TAG, "End Sending Data")
            isServiceRunning = false
            endForegroundService(context)
        },
        modifier = Modifier.padding(16.dp)
    ) {
        Text("전송 끝")
    }
}