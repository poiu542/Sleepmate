package com.example.sleepmate.presentation

import android.Manifest
import android.content.ContentValues.TAG
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.wear.compose.material.Button
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Text
import com.example.sleepmate.complication.APIS
import com.example.sleepmate.complication.MyForegroundService
import com.example.sleepmate.presentation.theme.SleepmateTheme
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 *  센서를 추가하기 위해서는 AndroidManifest.xml에 permission 추가
 *  포그라운드 서비스 : 백그라운드에서 실행될 수 있는 앱이며, 알림 창으로 실행하고 있다고 정보를 주는 서비스
 *  스마트폰과의 데이터 전송 (Wearable Data Layer API) : https://developer.android.com/training/wearables/data/data-layer?hl=ko
 *  포그라운드 코드는 complication - MyForegroundService
 *  Udp 전송 코드는 complication - UdpClient
 */

private var isServiceRunning = false
class MainActivity : ComponentActivity() {

    // Manifest 파일에서 permission 가져오기
    private val permissions = arrayOf(
        Manifest.permission.BODY_SENSORS,
        Manifest.permission.BODY_SENSORS_BACKGROUND,
        Manifest.permission.FOREGROUND_SERVICE
    )

    private val requestCode = 0

    // 라이프 사이클 : https://developer.android.com/guide/components/activities/activity-lifecycle?hl=ko
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ActivityCompat.requestPermissions(this, permissions, requestCode)

            sendConnectedSignal(this)

            WearApp("Android", context = this)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
    }
}

private fun sendConnectedSignal(context: Context) {
    val api = APIS.create()

    api.post_connection(1).enqueue(object : Callback<Void> {
        override fun onResponse(call: Call<Void>, response: Response<Void>) {
            Log.d("log", response.toString())
            Log.d("log", response.body().toString())
        }

        override fun onFailure(call: Call<Void>, t: Throwable) {
            Log.d("log", t.message.toString())
            Log.d("log", "Post connection fail")
        }
    })
}

// 포그라운드 서비스 시작
fun startForegroundService(context: Context) {
    val serviceIntent = Intent(context, MyForegroundService::class.java)
    ContextCompat.startForegroundService(context, serviceIntent)
}

// 포그라운드 서비스 끝
fun endForegroundService(context: Context) {
    val serviceIntent = Intent(context, MyForegroundService::class.java)
    context.stopService(serviceIntent)
}

@Composable
//fun WearApp(greetingName: String, context: Context, udpClient: UdpClient) {
fun WearApp(greetingName: String, context: Context) {
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

// 포그라운드 서비스 (데이터 전송) 시작 버튼
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

// 포그라운드 서비스 (데이터 전송 중지) 중지 버튼
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