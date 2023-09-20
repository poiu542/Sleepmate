package com.example.sleepmate.complication

import android.content.ContentValues.TAG
import android.content.Context
import android.util.Log
import java.lang.Exception
import java.net.DatagramPacket
import java.net.DatagramSocket
import java.net.InetAddress

class UdpClient(internal val context: Context, private val serverAddress: String, private val serverPort: Int) {
    fun sendData(data: String) {
        try {
            val socket = DatagramSocket()
            val serverIpAddress = InetAddress.getByName(serverAddress)
            val sendData = data.toByteArray()
            val packet = DatagramPacket(sendData, sendData.size, serverIpAddress, serverPort)
            socket.send(packet)
            socket.close()
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e(TAG, "send error")
        }
    }
}