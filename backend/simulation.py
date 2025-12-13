import random
import time
import math

def generate_machine_data(machine_id: int):
    t = time.time()
    
    if machine_id == 1:
        
        wave = math.sin(t * 0.8) 
        
        
        base_temp = 296.0 + (wave * 2.0) 
        base_rpm = 1200.0 + (wave * 100)  
        base_torque = 10.0 + (wave * 4)  
        tool_wear = 5.0    
        noise_level = 2.0 
        
    
    elif machine_id == 2:
        
        wave = math.sin(t * 0.5) 
        
        base_temp = 305.0 + (wave * 5)    
        base_rpm = 1700.0 + (wave * 300)
        base_torque = 45.0 + (wave * 10)
        tool_wear = 150.0                 
        noise_level = 1.5
        
    
    else: 
        # Nilai Kritis
        wave = math.sin(t * 0.2)
        base_temp = 320.0 + (wave * 1.0)
        base_rpm = 2300.0 + (wave * 50)
        base_torque = 70.0 + (wave * 2)
        
        tool_wear = random.uniform(230.0, 240.0) 
        noise_level = 3.0 

    
    
    
    noise_temp = random.uniform(-noise_level, noise_level) * 0.1
    noise_rpm = random.uniform(-noise_level, noise_level) * 5
    noise_torque = random.uniform(-noise_level, noise_level) * 0.5

    final_rpm = max(0, base_rpm + noise_rpm)
    final_torque = max(0, base_torque + noise_torque)
    
    process_temp = (base_temp + noise_temp) + 12

    return {
        "air_temp": base_temp + noise_temp,
        "process_temp": process_temp,
        "rpm": final_rpm,
        "torque": final_torque,
        "tool_wear": tool_wear 
    }