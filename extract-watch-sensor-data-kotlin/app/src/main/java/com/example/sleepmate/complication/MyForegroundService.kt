package com.example.sleepmate.complication

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.PendingIntent.FLAG_IMMUTABLE
import android.app.Service
import android.content.ComponentName
import android.content.ContentValues.TAG
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
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import kotlin.math.roundToLong

class MyForegroundService : Service() {
    private lateinit var sensorManager: SensorManager

    private lateinit var heartRateSensor: Sensor
    private lateinit var accelerometerSensor: Sensor
    private lateinit var lightSensor: Sensor

    private lateinit var heartRateListener: SensorEventListener
    private lateinit var accelerometerListener: SensorEventListener
    private lateinit var lightListener: SensorEventListener

    private var heartRateLastSentTimeMillis: Long = 0
    private var accelerometerLastSentTimeMillis: Long = 0
    private var lightLastSentTimeMillis: Long = 0
    private val heartRateIntervalMillis: Long = 10000
    private val accelerometerIntervalMillis: Long = 1000
    private val lightIntervalMillis: Long = 20 * 60 * 1000

    override fun onCreate() {
        super.onCreate()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channelId = "sleepMate"
            val channelName = "SleepMate"
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(channelId, channelName, importance)

            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val notification: Notification = NotificationCompat.Builder(this, "sleepMate")
            .setContentTitle("Foreground Service")
            .setContentText("데이터 전송 중")
            .setContentIntent(
                PendingIntent.getActivity(
                    this,
                    0,
                    Intent(this, MainActivity::class.java),
                    FLAG_IMMUTABLE
                )
            ).build()

        startForeground(1, notification)

        // Sensor
        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        heartRateSensor = sensorManager.getDefaultSensor(Sensor.TYPE_HEART_RATE)
        accelerometerSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        lightSensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT)

        // 센서 리스트 확인하기
        var sensorList:List<Sensor> = sensorManager.getSensorList(23)

        Log.d("wakeupGesture", sensorList.toString())

        heartRateListener = object : SensorEventListener {
            override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

            override fun onSensorChanged(event: SensorEvent?) {
                if (event?.sensor?.type == Sensor.TYPE_HEART_RATE) {
                    val currentTimeMillis = System.currentTimeMillis()
                    if (currentTimeMillis - heartRateLastSentTimeMillis >= heartRateIntervalMillis) {
                        val heartRateValue = event.values[0]

                        GlobalScope.launch {
                            try {
                                val udpClient: UdpClient by lazy {
                                    UdpClient(this@MyForegroundService,"192.168.119.200", 9894)
                                }

                                udpClient.sendData("heartRate : $heartRateValue")
                                Log.d("HeartRate", "heartRate : $heartRateValue")

                                heartRateLastSentTimeMillis = currentTimeMillis
                            } catch (e: Exception) {
                                Log.e("HeartRate", "Error sending data: ${e.message}", e)
                            }
                        }
                    }
                }
            }
        }

        accelerometerListener = object : SensorEventListener {
            override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

            override fun onSensorChanged(event: SensorEvent?) {
                if (event?.sensor?.type == Sensor.TYPE_ACCELEROMETER) {
                    val currentTimeMillis = System.currentTimeMillis()
                    if (currentTimeMillis - accelerometerLastSentTimeMillis >= accelerometerIntervalMillis) {
                        val accelerometerValue = Math.sqrt(Math.pow(event.values[0].toDouble(), 2.0)
                                + Math.pow(event.values[1].toDouble(), 2.0)
                                + Math.pow(event.values[2].toDouble(), 2.0))

                        GlobalScope.launch {
                            try {
                                val udpClient: UdpClient by lazy {
                                    UdpClient(this@MyForegroundService,"192.168.119.200", 9894)
                                }

                                udpClient.sendData("acclerometer : $accelerometerValue")
                                Log.d("Accelerometer", "acclerometer : $accelerometerValue")

                                accelerometerLastSentTimeMillis = currentTimeMillis
                            } catch (e: Exception) {
                                Log.e("Accelerometer", "Error sending data: ${e.message}", e)
                            }
                        }
                    }
                }
            }
        }

        lightListener = object : SensorEventListener {
            override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

            override fun onSensorChanged(event: SensorEvent?) {
                if (event?.sensor?.type == Sensor.TYPE_LIGHT) {
                    val currentTimeMillis = System.currentTimeMillis()
                    if (currentTimeMillis - lightLastSentTimeMillis >= lightIntervalMillis) {
                        val lightValue = event.values[0]

                        GlobalScope.launch {
                            try {
                                val udpClient: UdpClient by lazy {
                                    UdpClient(this@MyForegroundService,"192.168.119.200", 9894)
                                }

                                udpClient.sendData("light : $lightValue")
                                Log.d("Light", "light : $lightValue")

                                lightLastSentTimeMillis = currentTimeMillis
                            } catch (e: Exception) {
                                Log.e("Light", "Error sending data: ${e.message}", e)
                            }
                        }
                    }
                }
            }
        }

        sensorManager.registerListener(
            heartRateListener,
            heartRateSensor,
            SensorManager.SENSOR_DELAY_NORMAL
        )

        sensorManager.registerListener(
            accelerometerListener,
            accelerometerSensor,
            SensorManager.SENSOR_DELAY_NORMAL
        )

        sensorManager.registerListener(
            lightListener,
            lightSensor,
            SensorManager.SENSOR_DELAY_NORMAL
        )

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
        sensorManager.unregisterListener(accelerometerListener)
        sensorManager.unregisterListener(lightListener)
    }

}