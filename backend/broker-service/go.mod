module github.com/MahikaJaguste/grant-management-system/backend/broker-service

go 1.22.5

require (
	github.com/MahikaJaguste/grant-management-system/proto v0.0.0-00010101000000-000000000000
	github.com/grpc-ecosystem/grpc-gateway/v2 v2.26.1
	google.golang.org/grpc v1.70.0
)

require (
	golang.org/x/net v0.33.0 // indirect
	golang.org/x/sys v0.28.0 // indirect
	golang.org/x/text v0.22.0 // indirect
	google.golang.org/genproto/googleapis/api v0.0.0-20250204164813-702378808489 // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20250204164813-702378808489 // indirect
	google.golang.org/protobuf v1.36.5 // indirect
)

replace github.com/MahikaJaguste/grant-management-system/proto => ../../proto
