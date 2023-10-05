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
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 * Foreground 서비스 코드
 * 아래에 Udp 전송을 할 서버 주소를 입력하는 부분을 알 맞게 고쳐야 함
 * 서버 단에서는 포트만 열어주면 되고, 추가적인 방화벽 설정이 필요할 것
 */

class MyForegroundService : Service() {
    private lateinit var sensorManager: SensorManager

    // 사용하는 센서 종류
    private lateinit var heartRateSensor: Sensor
    private lateinit var accelerometerSensor: Sensor
    private lateinit var lightSensor: Sensor

    private lateinit var heartRateListener: SensorEventListener
    private lateinit var accelerometerListener: SensorEventListener
    private lateinit var lightListener: SensorEventListener

    private var heartRateLastSentTimeMillis: Long = 0
    private var accelerometerLastSentTimeMillis: Long = 0
    private var lightLastSentTimeMillis: Long = 0

    // 센서 인터벌 : 몇 초 후에 센서 값을 전송할 것인지 ms 단위
    private val heartRateIntervalMillis: Long = 10000
    private val accelerometerIntervalMillis: Long = 1000
    private val lightIntervalMillis: Long = 30000

    override fun onCreate() {
        super.onCreate()

        // 포그라운드 서비스를 위한 기본적인 알림창 구현
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

        // Sensor 적용
        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        heartRateSensor = sensorManager.getDefaultSensor(Sensor.TYPE_HEART_RATE)
        accelerometerSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        lightSensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT)

        val api = APIS.create()

        // HeartRate 센서
        heartRateListener = object : SensorEventListener {
            override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

            override fun onSensorChanged(event: SensorEvent?) {
                if (event?.sensor?.type == Sensor.TYPE_HEART_RATE) {
                    val currentTimeMillis = System.currentTimeMillis()
                    if (currentTimeMillis - heartRateLastSentTimeMillis >= heartRateIntervalMillis) {
                        val heartRateValue = event.values[0]

                        GlobalScope.launch {
                            try {
                                Log.d("HeartRate", "heartRate : $heartRateValue")

                                val data = HeartModel("$heartRateValue")

                                api.post_heart_rate(data).enqueue(object : Callback<PostResult> {
                                    override fun onResponse(call: Call<PostResult>, response: Response<PostResult>) {
                                        Log.d("log", response.toString())
                                        Log.d("log", response.body().toString())
                                    }

                                    override fun onFailure(call: Call<PostResult>, t: Throwable) {
                                        Log.d("log", t.message.toString())
                                        Log.d("log", "HeartRate fail")
                                    }
                                })

                                heartRateLastSentTimeMillis = currentTimeMillis
                            } catch (e: Exception) {
                                Log.e("HeartRate", "Error sending data: ${e.message}", e)
                            }
                        }
                    }
                }
            }
        }

        // 가속도 센서
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
                                Log.d("Accelerometer", "accelerometer : $accelerometerValue")

                                val data = AccelerometerModel(1L, "$accelerometerValue")

                                api.post_accelerometer(data).enqueue(object : Callback<PostResult> {
                                    override fun onResponse(call: Call<PostResult>, response: Response<PostResult>) {
                                        Log.d("log", response.toString())
                                        Log.d("log", response.body().toString())
                                    }

                                    override fun onFailure(call: Call<PostResult>, t: Throwable) {
                                        Log.d("log", t.message.toString())
                                        Log.d("log", "Accelerometer fail")
                                    }
                                })

                                accelerometerLastSentTimeMillis = currentTimeMillis
                            } catch (e: Exception) {
                                Log.e("Accelerometer", "Error sending data: ${e.message}", e)
                            }
                        }
                    }
                }
            }
        }

        // 조도 센서
        lightListener = object : SensorEventListener {
            override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

            override fun onSensorChanged(event: SensorEvent?) {
                if (event?.sensor?.type == Sensor.TYPE_LIGHT) {
                    val currentTimeMillis = System.currentTimeMillis()
                    if (currentTimeMillis - lightLastSentTimeMillis >= lightIntervalMillis) {
                        val lightValue = event.values[0]

                        GlobalScope.launch {
                            try {
                                Log.d("Light", "light : $lightValue")

                                val data = LuxModel(1L, "$lightValue")

                                api.post_lux(data).enqueue(object : Callback<PostResult> {
                                    override fun onResponse(call: Call<PostResult>, response: Response<PostResult>) {
                                        Log.d("log", response.toString())
                                        Log.d("log", response.body().toString())
                                    }

                                    override fun onFailure(call: Call<PostResult>, t: Throwable) {
                                        Log.d("log", t.message.toString())
                                        Log.d("log", "Lux fail")
                                    }
                                })

                                lightLastSentTimeMillis = currentTimeMillis
                            } catch (e: Exception) {
                                Log.e("Light", "Error sending data: ${e.message}", e)
                            }
                        }
                    }
                }
            }
        }

        // 센서 매니저에 등록을 해야 동작 시작 + 센서의 감도, 주기를 설정 가능
        sensorManager.registerListener(
            heartRateListener,
            heartRateSensor,
            SensorManager.SENSOR_DELAY_FASTEST
        )

        sensorManager.registerListener(
            accelerometerListener,
            accelerometerSensor,
            SensorManager.SENSOR_DELAY_NORMAL,
            SensorManager.SENSOR_STATUS_ACCURACY_HIGH
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