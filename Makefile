
DEBUG=True
LESS_FILES= server/public/styles/style.less
CSS_FILES=$(LESS_FILES:.less=.css)

ifeq ($(DEBUG),True)
	LESSC=lessc
else
	LESSC=lessc -x
endif
	
blink:
	gcc -Wall -o "bin/blink" src/blink.c -lwiringPi	
white:
	gcc -Wall -o "bin/white" src/white.c -lwiringPi
random:
	gcc -Wall -o "bin/random" src/random.c -lwiringPi
led:
	gcc -Wall -o "bin/led" src/led.c -lwiringPi
fake:
	gcc -Wall -o "bin/fake" src/fake.c


less: $(CSS_FILES)
%.css: %.less
	$(LESSC) $< > $@
