package com.example.sleepmate.complication

data class HeartModel(
    var heartbeat : String? = null
)

data class LuxModel(
    var memberSeq: Long? = null,
    var lux : String? = null
)

data class AccelerometerModel(
    var memberSeq: Long? = null,
    var mvalue : String? = null
)

data class PostResult(
    var result : String? = null
)