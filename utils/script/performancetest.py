import requests
import json
import sys
import threading
import time
import asyncio
import random


class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

host_url = "URL TO TEST"

class MyThread(threading.Thread):
    def response_printer(code):
        switcher={
                        200:bcolors.OKGREEN + str(code) + bcolors.ENDC,
                        500:bcolors.WARNING + bcolors.BOLD + str(code) + bcolors.ENDC,
                        404:bcolors.FAIL + str(code) + bcolors.ENDC,
                     }
        func = switcher.get(code, lambda: "ERROR")
        #print(func, flush=True)

    """ /* SOME TEST FOR SOME ROUTE CHANGE AS YOU WISH TO TEST YOUR OWN ROUTE */ """

    def register(params):
        response = requests.post(host_url+"users/register",data=params.body)
        #print(response.content)
        #MyThread.core(1, params)

    def login(params):
        #print("LOGIN")
        response = requests.post(host_url+"users/login", json={"email": params.body["email"], "password": params.body["password"]}, headers=params.headers)
        #MyThread.response_printer(response.status_code)
        #print(response)
        #print(response.content)
        #print(params.body["email"])
        response = response.json()
        params.headers['Authorization'] = response['token']
        MyThread.core(2, params)

    def get_user(params):
        response = requests.get(host_url + "users/me", data={},headers=params.headers)
        #MyThread.response_printer(response.status_code)
        MyThread.core(3, params)

    def get_products(params):
        response = requests.get(host_url + "products/", data={}, headers=params.headers)
        #MyThread.response_printer(response.status_code)
        MyThread.core(4, params)

    def get_selfies(params):
        response = requests.get(host_url + "selfies/me", data={}, headers=params.headers)
        #MyThread.response_printer(response.status_code)
        MyThread.core(5, params)

    def stop(params):
        #print("{} finished!".format(params.getName()))       # "Thread-x finished!"
        request_time = (time.process_time() - params.start) * 1000
        print(params.name + ": " + "request completed in {0:.0f}ms".format(request_time), flush=True)
        exit()

    def core(i, params):
            switcher={
                    0:MyThread.register,
                    1:MyThread.login,
                    2:MyThread.get_user,
                    3:MyThread.get_products,
                    4:MyThread.get_selfies,
                    5:MyThread.stop
                 }
            # Get the function from switcher dictionary
            func = switcher.get(i, lambda: "Invalid Type")
            #print(func)
            # Execute the function
            func(params)

    def __init__(self, x, body, headers):      # jusqua = donnée supplémentaire
        threading.Thread.__init__(self)  # ne pas oublier cette ligne
        # (appel au constructeur de la classe mère)
        self.x = x
        self.body = body
        self.headers = headers
        self.name = "THREAD n°"+ str(x)

    def run(self):
        #print(time.process_time())
        #time.sleep(random.uniform(0, 60))
        self.start = time.process_time()# Default called function with mythread.start()
        #print("{} started!".format(self.getName()))        # "Thread-x started!"
        MyThread.core(0,self)


def main():
    start = time.perf_counter()
    count = int(sys.argv[1])
    rows = round((count / 60)) + 1
    threads = [[0 for _ in range(60)] for _ in range(rows)]
    y = 0
    u = 0
    for x in range(0, count):
        if (x % 60 == 0 and x != 0):
            print("ROW " + str(x))
            u = 0
            y += 1
        #print(x)
        body = {
            "email": "user"+ str(x) + "@test.fr",
            "password": str(x),
            "first_name": "user".format(x),
            "last_name": "test".format(x),
            "gender": "female"
        }
        headers = {'content-type': 'application/json',
                   'Authorization': ''}
        t = MyThread(x,body,headers)
        #print("X =" + str(x) + " Y = " + str(y) + " U = " + str(u))
        threads[y][u] = t
        u += 1 
    y = 0
    for groupthread in threads:
        for thread in groupthread:
            if isinstance(thread, int) == False:
                #Sleep to increase the time between each thread
                time.sleep(0.2)
                thread.start()
    
    for groupthread in threads:
        for thread in groupthread:
            if isinstance(thread, int) == False:
                #y += 1
                thread.join()

    end = time.perf_counter()
    #print(f'{y}')
    print(f'Finished in {round(end-start, 2)} second(s)')

if __name__ == '__main__':
    main()