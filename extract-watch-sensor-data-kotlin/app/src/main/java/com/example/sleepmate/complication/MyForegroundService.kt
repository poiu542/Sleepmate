package com.example.sleepmate.complication

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.PendingIntent.FLAG_IMMUTABLE
import android.app.Service
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import com.example.sleepmate.presentation.MainActivity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class MyForegroundService : Service() {
    private lateinit var sensorManager: SensorManager
    private lateinit var heartRateSensor: Sensor
    private lateinit var heartRateListener: SensorEventListener

    private val udpClient: UdpClient by lazy {
        UdpClient("192.168.171.200", 9894)
    }

    override fun onCreate() {
        super.onCreate()
        // Notification 채널 생성 및 등록
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channelId = "mychannel" // 채널 ID
            val channelName = "SleepMate" // 채널 이름
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(channelId, channelName, importance)

            val notificationManager =
                getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // Foreground 서비스를 계속 실행하기 위한 Notification 설정
        val notification: Notification = NotificationCompat.Builder(this, "mychannel")
            .setContentTitle("Foreground Service")
            .setContentText("데이터 전송 중")
            .setContentIntent(
                PendingIntent.getActivity(
                    this,
                    0,
                    Intent(this, MainActivity::class.java),
                    FLAG_IMMUTABLE
                )
            )
            .build()

        startForeground(1, notification)

        // Sensor
        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        heartRateSensor = sensorManager.getDefaultSensor(Sensor.TYPE_HEART_RATE)

        heartRateListener = object : SensorEventListener {
            override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

            override fun onSensorChanged(event: SensorEvent?) {
                CoroutineScope(Dispatchers.IO).launch {
                    if (event?.sensor?.type == Sensor.TYPE_HEART_RATE) {
                        val heartRateValue = event.values[0]

                        // 센서 값이 변경되면 바로 전송
                        try {
                            udpClient.sendData("data : $heartRateValue")
                            Log.d("Foreground", "Data sent : " + heartRateValue)
                        } catch (e: Exception) {
                            Log.e("Foreground", "Error sending data: ${e.message}", e)
                        }
                    }
                }
            }
        }

        sensorManager.registerListener(
            heartRateListener,
            heartRateSensor,
            100000
        )

        // START_STICKY를 반환하여 서비스가 종료될 경우 시스템이 자동으로 다시 시작하도록 합니다.
        return START_STICKY
    }

    override fun startForegroundService(service: Intent?): ComponentName? {
        return super.startForegroundService(service)
    }

    override fun onBind(p0: Intent?): IBinder? {
        return null
    }

    override fun onDestroy() {
        super.onDestroy()
        sensorManager.unregisterListener(heartRateListener)
    }

}