import serial
import time 

serialArduino = serial.Serial("COM3", 9600) 
time.sleep(1)

while True:
    cad = serialArduino.readline().decode('ascii')

    print(cad)