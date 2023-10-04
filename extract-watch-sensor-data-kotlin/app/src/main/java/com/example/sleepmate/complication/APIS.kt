package com.example.sleepmate.complication

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Headers
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Streaming

interface APIS {
    @POST("notifications/send-data/{id}")
    fun post_connection(@Path("id") id: Long): Call<Void>

    @POST("data/heartbeat")
    @Headers("accept: application/json", "content-type: application/json")
    fun post_heart_rate(@Body jsonparams: HeartModel): Call<PostResult>

    @POST("watch/illuminance")
    @Headers("accept: application/json", "content-type: application/json")
    fun post_lux(@Body jsonparams: LuxModel): Call<PostResult>

    @POST("watch/acceleration")
    @Headers("accept: application/json", "content-type: application/json")
    fun post_accelerometer(@Body jsonparams: AccelerometerModel): Call<PostResult>

    companion object {
        private const val BASE_URL = "https://j9b103.p.ssafy.io/api/"

        fun create(): APIS {
            val gson : Gson = GsonBuilder().setLenient().create();

            return Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build()
                .create(APIS::class.java)
        }
    }
}