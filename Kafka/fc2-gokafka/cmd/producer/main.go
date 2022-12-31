package main

import (
	"fmt"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	producer := NewKafkaProducer()
	Publish("mensagem", "teste", producer, nil)
	producer.Flush(10000000)
}

// * indica o retorno da função
func NewKafkaProducer() *kafka.Producer {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "fc2-gokafka-kafka-1:9092",
	}

	p, err := kafka.NewProducer(configMap)
	if err != nil {
		fmt.Println(err.Error())
	}
	return p
}

func Publish(msg string, topic string, producer *kafka.Producer, key []byte) error {
	message := &kafka.Message{
		Value:          []byte(msg),
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
		Key:            key,
	}

	err := producer.Produce(message, nil)

	if err != nil {
		return err
	}
	return nil
}
